# prepare-deploy.ps1 - Prepares deploy/core (Laravel) and deploy/frontend (Next.js)
param(
    [switch]$CoreOnly,
    [switch]$FrontOnly
)

$Root      = Split-Path -Parent $MyInvocation.MyCommand.Path
$Project   = Split-Path -Parent $Root
$Backend   = Join-Path $Project "laravel-backend"
$CoreDest  = Join-Path $Root "core"
$FrontDest = Join-Path $Root "frontend"

function Info  { param($m) Write-Host "[INFO] $m" -ForegroundColor Cyan }
function OK    { param($m) Write-Host "[ OK ] $m" -ForegroundColor Green }
function WARN  { param($m) Write-Host "[WARN] $m" -ForegroundColor Yellow }
function FAIL  { param($m) Write-Host "[FAIL] $m" -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "======================================" -ForegroundColor Magenta
Write-Host "  Al-Bayt Charity - Deploy Prepare    " -ForegroundColor Magenta
Write-Host "======================================" -ForegroundColor Magenta
Write-Host ""

# =====================================================
# PART 1: Laravel Backend -> deploy/core
# =====================================================
if (-not $FrontOnly) {

    Info "Copying Laravel backend to deploy/core ..."

    if (Test-Path $CoreDest) {
        WARN "Cleaning old core/ folder..."
        Remove-Item $CoreDest -Recurse -Force
    }
    New-Item -ItemType Directory -Path $CoreDest | Out-Null

    $ExcludeDirs  = @("vendor","node_modules",".git",".vscode",".idea","public\build","public\hot","public\storage")
    $ExcludeFiles = @("*.log","database.sqlite",".env",".phpunit.result.cache","Thumbs.db")

    $args = @($Backend, $CoreDest, "/E", "/XD") + $ExcludeDirs + @("/XF") + $ExcludeFiles + @("/NFL","/NDL","/NJH","/NJS")
    & robocopy @args | Out-Null

    if ($LASTEXITCODE -ge 8) {
        FAIL "robocopy failed (exit code: $LASTEXITCODE)"
    }
    OK "Files copied successfully"

    # Copy .env.production -> core/.env
    # Note: file lives in deploy/ root (NOT deploy/core/) to survive the clean step
    $ProdEnv = Join-Path $Root ".env.production"
    $DestEnv  = Join-Path $CoreDest ".env"
    if (Test-Path $ProdEnv) {
        Copy-Item $ProdEnv $DestEnv -Force
        OK "Copied .env.production -> core/.env"
    } else {
        WARN ".env.production not found in deploy/ folder!"
    }

    # Create required storage directories with .gitkeep
    $dirs = @(
        "storage\app\public",
        "storage\framework\cache\data",
        "storage\framework\sessions",
        "storage\framework\views",
        "storage\logs"
    )
    foreach ($d in $dirs) {
        $p = Join-Path $CoreDest $d
        New-Item -ItemType Directory -Path $p -Force | Out-Null
        New-Item -ItemType File -Path (Join-Path $p ".gitkeep") -Force | Out-Null
    }
    OK "Storage directories created"

    # Root .htaccess for InfinityFree (redirect all to public/)
    $htFile = Join-Path $CoreDest ".htaccess"
    if (-not (Test-Path $htFile)) {
        $ht = "<IfModule mod_rewrite.c>`r`n    RewriteEngine On`r`n    RewriteRule ^(.*)$ public/`$1 [L]`r`n</IfModule>"
        [System.IO.File]::WriteAllText($htFile, $ht, [System.Text.Encoding]::UTF8)
        OK "Created root .htaccess (redirects to public/)"
    }

    OK "Core ready at: deploy\core\"
}

# =====================================================
# PART 2: Next.js Build -> deploy/frontend
# =====================================================
if (-not $CoreOnly) {

    Info "Building Next.js for production..."

    $nodeModules = Join-Path $Project "node_modules"
    if (-not (Test-Path $nodeModules)) {
        WARN "node_modules missing, running npm install..."
        Push-Location $Project
        npm install
        if ($LASTEXITCODE -ne 0) { FAIL "npm install failed" }
        Pop-Location
    }

    # Swap next.config.ts with production version
    $configSrc    = Join-Path $Root "next.config.production.ts"
    $configDest   = Join-Path $Project "next.config.ts"
    $configBackup = Join-Path $Project "next.config.ts.bak"

    if (Test-Path $configSrc) {
        Copy-Item $configDest $configBackup -Force
        Copy-Item $configSrc $configDest -Force
        OK "Applied next.config.production.ts"
    }

    Info "Running next build..."
    Push-Location $Project
    $env:NODE_ENV = "production"
    npm run build
    $buildExit = $LASTEXITCODE
    Pop-Location

    # Restore original next.config.ts
    if (Test-Path $configBackup) {
        Copy-Item $configBackup $configDest -Force
        Remove-Item $configBackup -Force
        OK "Restored original next.config.ts"
    }

    if ($buildExit -ne 0) { FAIL "next build failed! Check errors above." }
    OK "Build complete"

    # Clean old frontend folder
    if (Test-Path $FrontDest) {
        WARN "Cleaning old frontend/ folder..."
        Remove-Item $FrontDest -Recurse -Force
    }
    New-Item -ItemType Directory -Path $FrontDest | Out-Null

    # Copy build output
    $OutDir        = Join-Path $Project "out"
    $StandaloneDir = Join-Path $Project ".next\standalone"

    if (Test-Path $StandaloneDir) {
        Info "Copying standalone output..."
        robocopy $StandaloneDir $FrontDest /E /NFL /NDL /NJH /NJS | Out-Null
        $s = Join-Path $Project ".next\static"
        if (Test-Path $s) { robocopy $s (Join-Path $FrontDest ".next\static") /E /NFL /NDL /NJH /NJS | Out-Null }
        $p = Join-Path $Project "public"
        if (Test-Path $p) { robocopy $p (Join-Path $FrontDest "public") /E /NFL /NDL /NJH /NJS | Out-Null }
        OK "Standalone output copied"
    } elseif (Test-Path $OutDir) {
        Info "Copying static export (out/)..."
        robocopy $OutDir $FrontDest /E /NFL /NDL /NJH /NJS | Out-Null
        OK "Static export copied"
    } else {
        WARN "No out/ or .next/standalone found. Check next.config.ts"
    }

    OK "Frontend ready at: deploy\frontend\"
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "  DONE! Deploy folder is ready.       " -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "  deploy/core/     -> Upload via FTP to InfinityFree" -ForegroundColor White
Write-Host "  deploy/frontend/ -> Push to GitHub Pages" -ForegroundColor White
Write-Host ""
