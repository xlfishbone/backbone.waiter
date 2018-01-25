@echo off

REM Get version number
set /p ver=New Version Number or q to quit:
IF "%ver%"=="q" GOTO end
IF "%ver%"=="" GOTO Error 

REM update npm with new version and publish
npm version %ver%
npm publish

REM tag and push to origin
git tag v%ver%
git push origin v%ver%

:Error
echo no version number found! 
goto start

:end
