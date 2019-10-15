# Chrer <img src="https://raw.githubusercontent.com/zonicdoe/resources/master/Chrer/IMG/chrer128.png" alt="Chrer" width="50px" align="right" />


**Atom Chrome extension hot reloader.**<br>
**Reload** packed or unpacked Chrome **extensions** and refresh tabs **as you save changes** on Atom editor.
Specially designed **for Chrome extension developers**, this Atom package will help you **boosting** your **developing** process **speed** by showing you the results of your code **updates** in Chrome **on the fly**.

**Check it out at [Atom.io »](https://atom.io/packages/Chrer "Chrer at Atom.io")**

![Demo](https://github.com/zonicdoe/resources/raw/master/Chrer/IMG/demo.gif)

## Table of contents
* [What it does?](#what-it-does)
* [How to install](#how-to-install)
  + [Installation from the package manager](#installation-from-the-package-manager).
  + [Installation from source](#installation-from-source).
* [Setup](#setup)
* [Usage](#usage)
  + [Start Chrer](#start-chrer)
  + [Stop Chrer](#stop-chrer)
  + [Manual reload](#manual-reload)
  + [Pause auto-reload](#pause-auto-reload)
* [Dependencies](#Dependencies)
* [How it works?](#how-it-works)
* [What's new?](#whats-new)
* [Contribute](#contribute)
* [License](#license)

## What it does?
If you have developed a Chrome extension before, you might had encountered a problem... that the browser doesn't reload your previously installed unpacked extension automatically after you make any changes; so you had to reload your extension manually from the extensions panel and sometimes even refresh some tabs targeted by content scripts.<br>
Well, with Atom and Chrer, that doesn't happen anymore. Use this tool to spawn an especial Chrome window that reloads your extensions and tabs every time you save your source files in Atom.

## How to install
#### Installation from the package manager
1.- Start Atom editor, if you haven't yet.

2.- In the **menu** bar, go to **Edit/Preferences**.<br>
If the option is not there, try **"File"** menu and then **"Setings"** or press `Ctrl + ,`.

3.- In the menu from the left, go to **"Install"**.

4.- In the search bar, **type "Chrer"**.

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
For a complete setup guide, please visit the [Setup guide page »](https://github.com/zonicdoe/Chrer/blob/master/SETUP.md "Setup guide")

## Usage
#### Start Chrer
You can **start Chrer** from the **"Packages"** menu, in **Chrer/Connect**.<br>
Additionally, you can run it **from the command palette** pressing `Ctrl + Shift + p`. Type *chrer* and Select **"Chrer:connect"**.<br>
However, **the easiest way** to start Chrer is by typing the **keybinding** shortcut:<br>
`CMD + Shift + c`

#### Stop Chrer
To **stop Chrer**, simply **close the spawned Chrome Browser window** or, if you prefer, you can go to the **"Packages"** menu and click on **Chrer/Disconnect**.<br>
The **disconnect** command is **available** in the **command palette** as well.<br>
Another way to stop Chrer is by using the footer toolbar located at the bottom of the Atom's text editor, just click this button:
![Stop button](https://raw.githubusercontent.com/zonicdoe/resources/master/Chrer/IMG/disconnect.png)<br>
And finally, **the easiest way** to stop Chreer, again, is the **keybinging** shortcut:<br>
`CMD + Shift + d`

#### Manual reload
You can **manually reload** the **Chrome browser** from Atom if you wish. Go to the **"Packages"** menu and click on **Chrer/Manual reload**.<br>
The **Manual reload** command is **available** in the **command palette** too.<br>
An additional way to do it is by using the footer toolbar located at the bottom of the Atom's text editor, just click this button:
![Stop button](https://raw.githubusercontent.com/zonicdoe/resources/master/Chrer/IMG/manualReload.png)<br>
The **keybinging** shortcut for this command is:<br>
`CMD + Shift + r`

#### Pause auto-reload
Some times, you will like to **pause the "auto-reload" feature** of the Chrome browser to make some changes to the source code and save them, but not requiring to reload the browser every single time. In that case, you can **pause this option** by going to the **"Packages"** menu and clicking on **Chrer/Toggle autoreload**. When you want to resume the "auto-reload" feature, click on the same option again.<br>
The **Toggle autoreload** command is **available** in the **command palette** as the other commands.<br>
Another way to toggle this option is by using the footer toolbar located at the bottom of the Atom's text editor, just click this button:
![Stop button](https://raw.githubusercontent.com/zonicdoe/resources/master/Chrer/IMG/pause.png)<br>
The **keybinging** shortcut for this command is:<br>
`CMD + Shift + p`

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

## What's new?
For a full description of new features added and fixed bugs, please visit the [releases page »](https://github.com/zonicdoe/Chrer/releases "Releases")

## Contribute
Your contribution to this humble project is highly appreciated, specially related to spelling and expression errors, for the whole project was created by a none English native speaker. Thanks a lot.<br>
Contact: zonic.doe@protonmail.com

## License
This project is under the [MIT LICENSE](https://github.com/zonicdoe/Chrer/blob/master/LICENSE.md "License")
