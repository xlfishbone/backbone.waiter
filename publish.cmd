@echo off

goto getVersionNumber
set /p doNpm=Update package.json and push to npm: y or n?
IF "%doNpm%"=="y" GOTO npm 

set /p doGit=Tag and Push to git: y or n?
IF "%doGit%"=="y" GOTO git 

:getVersionNumber
set /p ver=New Version Number or q to quit:
IF "%ver%"=="q" GOTO end
IF "%ver%"=="" GOTO Error 

:git
git tag v%ver%
git push
git push --tags

:npm
npm version %ver%
npm publish

:Error
echo no version number found! 
goto getVersionNumber

:end
