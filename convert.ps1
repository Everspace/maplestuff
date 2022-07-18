Write-Output "Hello"
$toolspath = "D:\Tools\libwebp-1.2.2-windows-x64\bin"
pushd "raw"
Get-Item *.webp | % { & "$toolspath\dwebp.exe" $_.Name -o ".\converted\$($_.Name | Split-Path -LeafBase).png" }
popd
