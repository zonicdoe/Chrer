# Chrer <img src="https://raw.githubusercontent.com/zonicdoe/resources/master/Chrer/IMG/chrer128.png" alt="Chrer" width="50px" align="right" />


**Atom Chrome extension hot reloader.**<br>
**Reload** packed or unpacked Chrome **extensions** and refresh tabs **as you save changes** on Atom editor.
Specially designed **for Chrome extension developers**, this Atom package will help you **boosting** your **developing** process **speed** by showing you the results of your code **updates** in Chrome **on the fly**.

## Table of contents
* [What it does?](#what-it-does)
* [How to install](#how-to-install)
  + [Installation from the package manager](#installation-from-the-package-manager).
  + [Installation from source](#installation-from-source).

* [Setup](#setup)
* [Usage](#usage)
  + [Start Chrer](#start-chrer)
  + [Stop Chrer](#stop-chrer)
* [Dependencies](#Dependencies)
* [How it works?](#how-it-works)
* [Contribute](#contribute)
* [License](#license)

## What it does?
If you have developed a Chrome extension before, you might had encountered a problem... that the browser doesn't reload your previously installed unpacked extension automatically after you make any changes; so you had to reload your extension manually from the extensions panel and sometimes even refresh some tabs targeted by content scripts.<br>
Well, with Atom and Chrer, that doesn't happen anymore. Use this tool to spawn an especial Chrome window that reloads your extensions and tabs every time you save your source files in Atom.

## How to install
#### Installation from the package manager
1.- Start Atom editor, if you haven't yet.<br>
2.- In the **menu** bar, go to **Edit/Preferences**.<br>
If the option is not there, try **"File"** menu and then **"Setings"** or press `Ctrl + ,`.<br>
3.- In the menu from the left, go to **"Install"**.<br>
4.- In the search bar, **type "Chrer"**.<br>
5.- Look for this package in the results and **click on "Install"**.

#### Installation from source
If you want to play with the package sources or simply want to install it manually, you can clone this repository and link the package to Atom:

1.- Open your console or terminal.

2.- Go to the location where you want to install Chrer.<br>
`$ cd /home/user/.atom/packages`

3.- Clone this repository.<br>
`$ git clone https://github.com/zonicdoe/Chrer.git`

4.- Go into Chrer directory.<br>
`$ cd Chrer`

5.- Run Atom's install command.<br>
  `$ apm install`<br>
  Now, you have to link it:<br>
  `$ apm link`

6.- Open Atom and verify that the package is installed. In the **menu** bar, go to **Edit/Preferences**. If the option is not there, try **"File"** menu and then **"Setings"** or press `Ctrl + ,`. In the menu from the left, go to **"Packages"**. Chrer must be at the top.

## Setup
1.- Install Google Chrome Browser if you haven't yet.

2.- Add Google Chrome to your PATH variables:

#### Windows users
* Locate the Chrome's executable file. Try in the following locations:
  + C:\Program Files\Google\Chrome\Application\chrome.exe
  + C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
  + C:\Program Files (x86)\Google\Application\chrome.exe
  + If you can't find it there, ask for help to your beloved friend Google to determine where Google Chrome is installed on your Windows version.

##### Windows 8 and 10
* In Search, search for "Edit the system environment variables" and open that.
* Click on the "Environment Variables" button. In the section "System Variables", find the "PATH" or "Path" environment variable and select it. Click Edit. If the PATH environment variable does not exist (which is not quite common), click New.

* **In Windows 8**, int the "Edit System Variable" (or New System Variable) window, specify the path of the Chrome's executable file (only the path, without the file name). For instance, if you found your Chrome executable at `C:\Program Files\Google\Chrome\Application\chrome.exe`, you have to **APPEND** `;C:\Program Files\Google\Chrome\Application\` at the end of the line. NOTICE THE SEMICOLON BEFORE THE PATH, IT'S VERY IMPORTANT THAT YOU DON'T MISS THAT SEMICOLON.
 Click OK. Close all remaining windows by clicking OK.<br>
 **In Windows 10**, click the "New" button and simply insert the path, for instance `C:\Program Files\Google\Chrome\Application\` and then click "Ok". Close all remaining windows by clicking OK.
* Now you can verify you did it right by running it with `Win + R`, type "cmd" and hit ENTER. In the command promt, type "chrome" and hit ENTER. A Chrome window should appear.

##### Windows 7
* From the desktop, right click the Computer icon.
* Choose "Properties" from the context menu.
* Click the "Advanced system settings" link.
* Click "Environment Variables". In the section "System Variables", find the "PATH" environment variable and select it. Click Edit. If the "PATH" environment variable does not exist (which is not quite common), click New.
* In the "Edit System Variable" (or New System Variable) window, specify the path of the Chrome's executable file (only the path, without the file name). For instance, if you found your Chrome executable at `C:\Program Files (x86)\Google\Application\chrome.exe`, you have to **APPEND** `;C:\Program Files (x86)\Google\Application\` at the end of the line. NOTICE THE SEMICOLON BEFORE THE PATH, IT'S VERY IMPORTANT THAT YOU DON'T MISS THAT SEMICOLON.
 Click OK. Close all remaining windows by clicking OK.<br>
* Now you can verify you did it right by running it with `Win + R`, type "cmd" and hit ENTER. In the command promt, type "chrome" and hit ENTER. A Chrome window should appear.

#### Linux users
Normally, after installing Google Chrome, it's available for execution via the terminal out of the box with the command `google-chrome`. To check whether it's available or not:
* Open a terminal.
* Execute the command:<br>
  `$ google-chrome`<br>
  If it loads correctly, you don't have nothing to worry about. If you receive a message similar to "_Command 'google-chrome' not found_" instead, and you have already installed Google Chrome, then you have to add the binary file to your PATH variables:
  + Locate the Chrome's binary file. Try in the following location:
    + /opt/google/chrome/  chrome <- Binary file
    + If you can't find it there, ask for help to your beloved friend Google to determine where Google Chrome is installed on your Linux distribution.
  + Using the text editor of your preference (vim, vi, gedit, nano,etc.), edit your .bashrc file located in your home directory, for instance, using gedit text editor, the command would be:<br>
  `$ gedit ~/.bashrc`
  + At the very end of the .bashrc file, add the Chrome's binary path (Only the path, without the binary name). For instance, if the binary file is located at `/opt/google/chrome/` :<br>
    `export PATH=$PATH:/opt/google/chrome/`
  + Save changes and exit.
  + If the name of the binary file is different than "google-chrome", remember it because you will have to change it in the Chrer settings page. See step 10 for details.

3.- Open Atom, if you haven't yet.

4.- Run Chrer with the keybinding `CMD + Shift + c` or any other method described at [usage](#usage).

5.- In the Chrome window that pops up, install the extension you are developing. You only have to do this once. In future executions, your extension will be ready on start. If you don't know how to install your extension in developer mode, here you got it:<br>
- **Open the Extension Management page** by navigating to **chrome://extensions**. The Extension Management page can also be opened by clicking on the Chrome menu, hovering over "More Tools", then selecting "Extensions".
- **Enable Developer Mode** by clicking the toggle switch next to Developer mode.
- Click the **LOAD UNPACKED** button and select the extension directory.

<img src="https://developer.chrome.com/static/images/get_started/load_extension.png">

- You are done, from now on, every time you start Chrer, your extension will be loaded. Close the Chrome window.

6.- Back to Atom. In the **menu** bar, go to **Edit/Preferences**.<br>
If the option is not there, try **"File"** menu and then **"Setings"** or press `Ctrl + ,`.

7.- In the menu from the left, go to **"Packages"**.

8.- In the search bar, **type "Chrer"**.

9.- Look for this package in the results and **click on "Settings"**.

10.- In this page, you can configure the behavior of Chrer:
1. **Target extension**. The name of the extension you wish to reload every time you save changes on Atom. This field corresponds to the "name" field of the extension's manifest file. You can find it in the Extensions Panel of Google Chrome as well, once you install it.

2. **Chrome's execution command**. Command by which Chrome is executed in the system. **Leave it as it is**. Don't change it unless it's necessary.

3. **Connection delay**. Once you run Chrer, a new Chrome Browser window will be opened and then, Atom will try to interact with it. This connection delay establish how long Atom has to wait for the Chrome's window to load. Depending on your system, a delay of 1 or 2 seconds should be enough, but if you notice that the Chrome window takes longer to load, increase this value.

4. **Home page**. The URL of the web page that will be displayed in the new Chrome window on start.

5. **IP**. IP address of the DevTools protocol server (the new Chrome window). **Leave it as it is**, it will connect to your own local setup by default (localhost or 127.0.0.1). You can change this value if you wish to connect to a remote server and it will work, but it will spawn a new Chrome window in your own machine any way. Also, this adds the little predicament of you having to manually run Chrome in remote debuggin mode and install the Chrer extension in the remote machine.<br>
TODO: Add an option to disable executing chrome in the local machine if the IP is not the loopback address.

6. **Port**. The DevTools protocol server listening port, 9222 by default. Change it only if it conflicts with any other service you are running in your local machine.

7. **Refresh all tabs**. Whether to refresh all the opened tabs or not. It works only if "Refresh tabs" is activated. If this is deactivated, only the active tab will be refreshed, otherwise, it will refresh all the tabs of the Chrome window.

8. **Refresh tabs**. Activates tab refreshing. If it's deactivated, none of the tabs from the Chrome window will be refreshed, other wise, tabs will be refreshed depending on the "Refresh all tabs" state.

## Usage
#### Start Chrer
You can **start Chrer** from the **"Packages"** menu, in **Chrer/Chrer:connect**.<br>
Additionally, you can run it **from the command palette** pressing `Ctrl + Shift + p`. Type *chrer* and Select **"Chrer:connect"**.<br>
However, **the easiest way** to start Chrer is by typing the **keybinding** shortcut:<br>
`CMD + Shift + c`
#### Stop Chrer
To **stop Chrer**, simply **close the spawned Chrome Browser window** or, if you prefer, you can go to the **"Package"** menu and click on **Chrer/Chrer:disconnect**.<br>
The **disconnect** command is **available** in the **command palette** as well.<br>
And finally, **the easiest way** to stop Chreer, again, is the **keybinging** shortcut:<br>
`CMD + Shift + d`

## Dependencies
Google Chrome 54 or above.

## How it works?
**For developers, technical description, skip if you are not interested.**

Chrer creates a child process window, executing Chrome in remote debugging mode with the following so called "switches":
  - remote-debugging-port
  - user-data-dir
  - no-first-run
  - no-default-browser-check
  - load-extension

The value of some of those parameters depend on your specific setup.
An example of the whole execution command line could be the following:

```
$ google-chrome \
--remote-debugging-port=9222 \
--user-data-dir=Chrer \
--no-first-run \
--no-default-browser-check \
--load-extension=/home/localUser/.atom/packages/Chrer/ext \
https://github.com/zonicdoe/Chrer
```
"remote-debugging-port" and the URL, correspond to your configuration values, "Port" and "Home page" respectively. You can find more details about Chrome's command line switches in the very handy Peter Beverloo's [switches list web page](https://peter.sh/experiments/chromium-command-line-switches/ "Chrome's swithces").

This command runs Chrome as a [DevTools protocol](https://chromedevtools.github.io/devtools-protocol/ "DevTools protocol docu") server, wich allows Chrer to interact with it programmatically. The "load-extension" switch forces the Chrome browser to initialize the Chrer extension, which executes the orders from the Chrer package in Atom (reload tab(s) and target extensions).<br>

Chrer implements the "[evaluate()](https://chromedevtools.github.io/devtools-protocol/tot/Runtime#method-evaluate "See the docu")" method of the ["Runtime" Domain](https://chromedevtools.github.io/devtools-protocol/tot/Runtime "See the docu") from the DevTools protocol to execute scripts on the Chrer's Chrome extension's background page context.<br>
The scripts themselves execute specific functions in this extension.<br>
The Chrer's Chrome extension implements the [chrome.tabs.update()](https://developer.chrome.com/extensions/tabs#method-update "See the docu") and the [chrome.management.setEnabled()](https://developer.chrome.com/extensions/management#method-setEnabled "See the docu") method from the [Chrome's API](https://developer.chrome.com/extensions/api_index "See the docu") to refresh the browser tab(s) and extension(s) respectively, among other functions.

## Contribute
Your contribution to this humble project is highly appreciated, specially related to spelling and expression errors, for the whole project was created by a none English native speaker. Thanks a lot.<br>
Contact: zonic.doe@protonmail.com

## License
This project is under the MIT LICENSE
