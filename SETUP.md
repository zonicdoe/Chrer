# **Setup guide**

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
