cls
del wecheck.apk
copy "%cd%\platforms\android\app\build\outputs\apk\release\android-release-unsigned.apk" "%cd%\gps.apk"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore gps.jks gps.apk gps