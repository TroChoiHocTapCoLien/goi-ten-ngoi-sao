[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ws = New-Object -ComObject WScript.Shell
$desktop = [System.Environment]::GetFolderPath('Desktop')
$startMenu = [System.Environment]::GetFolderPath('Programs')
$scriptDir = $PSScriptRoot

$html = Join-Path $scriptDir "index.html"
$ico = Join-Path $scriptDir "app.ico"

# Find Chrome or Edge
$browsers = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LocalAppData\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
)

$targetBrowser = $null
foreach ($b in $browsers) {
    if (Test-Path $b) {
        $targetBrowser = $b
        break
    }
}

if (-not $targetBrowser) {
    $targetBrowser = "msedge.exe"
}

$destinations = @(
    (Join-Path $desktop "Gọi Tên Ngôi Sao.lnk"),
    (Join-Path $startMenu "Gọi Tên Ngôi Sao.lnk")
)

foreach ($dst in $destinations) {
    try {
        $sc = $ws.CreateShortcut($dst)
        $sc.TargetPath = $targetBrowser
        $sc.Arguments = "--app=""file:///$html"""
        $sc.WorkingDirectory = $scriptDir
        $sc.Description = "Gọi Tên Ngôi Sao - Ứng dụng gọi tên học sinh ngẫu nhiên"
        if (Test-Path $ico) {
            $sc.IconLocation = "$ico,0"
        }
        $sc.Save()
        Write-Host "Đã tạo lối tắt: $dst"
    } catch {
        Write-Warning "Không thể tạo: $dst ($($_.Exception.Message))"
    }
}
