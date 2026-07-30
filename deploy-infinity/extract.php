<?php
// Security: hardcoded deploy token
$token = $_GET['token'] ?? '';
if ($token !== 'alalbayt_deploy_2026_secure') {
    http_response_code(403);
    die('Forbidden');
}

$action = $_GET['action'] ?? 'extract';

if ($action === 'ping') {
    echo 'PONG - Server is ready!';
    exit;
}

if ($action === 'extract' || $action === 'extract_named') {
    $zipName = $_GET['zip'] ?? 'deploy.zip';
    // Sanitize filename - only allow alphanumeric, dash, underscore, dot
    $zipName = preg_replace('/[^a-zA-Z0-9\-_\.]/', '', $zipName);
    $zipFile = __DIR__ . '/' . $zipName;

    if (!file_exists($zipFile)) {
        die("ERROR: $zipName not found in " . __DIR__);
    }

    $zip = new ZipArchive();
    $res = $zip->open($zipFile);
    if ($res === TRUE) {
        $zip->extractTo(__DIR__);
        $zip->close();
        unlink($zipFile);
        echo "OK: $zipName extracted successfully!";
        // Self-delete for security
        @unlink(__FILE__);
    } else {
        die("ERROR: Could not open $zipName (code: $res)");
    }
    exit;
}

echo 'Unknown action';
