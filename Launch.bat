@echo off
title Banker-Pending BanBot

if exist node_modules\ (
  echo Bu Modüller zaten yüklü
  echo Bot ayarları için "config" klasörüne ve komut dosyasını başlatmak için "src" klasörüne gidin
  pause
  exit
) else (
  call npm i >> NUL
  echo Modüller Başarıyla İndi
  echo Lütfen bu dosyayı yeniden çalıştırın.
  pause
  exit
)