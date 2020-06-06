# zedit

An integrated development environment for Bethesda Plugin Files.

- [Documentation](https://z-edit.github.io)
- [xEdit Comparison](https://z-edit.github.io/#/docs?t=Overview%2FxEdit%20Comparison)
- [Screenshots](https://imgur.com/a/sHguD)

# usage
Download a release from the [releases tab](https://github.com/matortheeternal/zedit/releases) and install or extract it, then run `zEdit.exe`.

There are two useful arguments available:  
- `--debug-process` allows you to access the main window with it's corresponding Inspector while a patch is building. Sometimes using a `debugger;` statement or a break point in a patcher could result in zEdit being unresponsive. You can now simply minimize the process window while the patcher is doing it's job. 
- `--debugger` will open port 9222 on localhost for debugging. You can now use an external debugger like VS Code and WebStorm ([Clients](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients)).

# development
This is a git repository.  If you want to help with development you'll need to [clone it](https://help.github.com/en/articles/cloning-a-repository) using `git` from the command line or a Git GUI client.  If you're going to use a Git GUI client I recommend [GitKraken](https://www.gitkraken.com/).

zEdit is a Windows x64 NodeJS Electron application.  Install [NodeJS LTS](https://nodejs.org/en/download/) **64-bit**, then start a terminal/command prompt in the application directory and run `node -v` and `npm -v`.  The output should be v8.11.x and 5.6.x or newer.  If you get anything else you probably have multiple installations of node which you'll need to sort out.

Before installing node modules you need to tell NodeJS where Python is so it can build certain native dependencies.  Install [python 2.7](https://www.python.org/downloads/windows/)\* and [add an environmental variable](https://kb.wisc.edu/cae/page.php?id=24500) `PYTHON` set to the full path to `python.exe`.  E.g. `C:\dev\lang\Python27\python.exe`.  Restart your command prompt and test the environmental variable by typing `echo %PYTHON%`.

You will also need to install the `windows-build-tools` package.  Run `npm install --global --production windows-build-tools` in an elevated command prompt to do so.

Clone zEdit and run `npm install` in an elevated command prompt in its directory.  This will install required node modules and dependencies.  You will also need to run `npm run rebuild` to rebuild the xelib native node addon to work with Electron.

Initialize submodules with `git submodule update --init`, and install gulp with `npm i gulp-cli -g`.

You can then run the application with `npm start`.  You can build a release of the application using `npm run release`. 

NOTE: If you get `Error: Electron failed to install correctly`, simply delete the `node_modules\electron` folder if present and run `npm install` again.  You can also try `npm install electron` if this doesn't work.

# contact
If you're looking for support or want to contribute, join the [Modding Tools discord server](https://discord.gg/GUfRdpT).

You can view project progress and user stories on the [trello board](https://trello.com/b/AudbG6UN/zedit).
