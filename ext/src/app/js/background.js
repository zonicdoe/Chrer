// UTILITIES: *****************************************************************
/* Tries to find the elements of "find" array in "inside" array.
   It returns an array of "not found" elements. */
function compare (find, inside) {
  var notFound = [];
  var wasFound;

  find.forEach(function(searchedElement) {
    wasFound = false;
    for (var i = 0; i < inside.length; i++) {
      if(searchedElement == inside[i]){
        wasFound = true;
        break;
      }
    }
    if (!wasFound) {
      notFound.push(searchedElement);
    }
  });

  return notFound;
}

// @param extensionNames  Arrary containing extension names
function getExtensionsByName (extensionNames) {
  return new Promise(
    function(resolve, reject){
      if (extensionNames.length > 0) {
        var extensions = [];
        var extensionsFoundNames = [];

        // Gets extensions installed:
        chrome.management.getAll(
          function(apps) {
            // Tries to find extensionNames's extension info:
            apps.forEach(function(app) {
              extensionNames.forEach(function(extensionName) {
                if(app.name.indexOf(extensionName) > -1){
                  extensions.push(app);
                  extensionsFoundNames.push(app.name);
                }
              });
            });

            if (extensions.length > 0) {
              // Verifies that all of the extensions required were found:
              // Compares and determines which extensions weren't found:
              var notFound = compare(extensionNames, extensionsFoundNames);
              if (notFound.length > 0) {
                // Some of the required extensions weren't found:
                var notFoundString = '';

                notFound.forEach(function(extension, i, array) {
                  notFoundString += extension;
                  notFoundString += (i == array.length - 1 ? '.' : ', ')
                });

                reject(
                  'The following extension(s) could\'t been found: ' +
                  notFoundString
                );
              }
              // All of the extensions were found:
              else {
                resolve(extensions);
              }
            }
            // None of the extensions required was found:
            else {
              reject('None of the extensions required was found.');
            }
          }
        );
      }
      // The array recieved by this method was empty;
      else{
        reject('Empty extension list.');
      }
    }
  );
}

function refreshTabs (all) {
  if (all) {
    chrome.tabs.query({url: "<all_urls>", currentWindow: true}, function(tabs) {
      tabs.forEach(
        function(tab) {
          chrome.tabs.update(tab.id, {url: tab.url});
        }
      );
    });
  } else {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
  }
}

function reloadExtension (extensionID) {
  return new Promise(
    function(resolve, reject){
      chrome.management.setEnabled(
        extensionID,
        false, // Disabled
        function() {
          console.log('Extension disabled...');
          setTimeout(function() {
            chrome.management.setEnabled(
              extensionID,
              true, // Enabled
              function() {
                console.log('Extension enabled.');
                resolve();
              }
            );
          }, 100);
        }
      );
    }
  );
}

// COMMAND EXECUTORS: *********************************************************

/* Executes "REFRESH" command.
   It triggers extension and browser reloading. */
function refreshAux (extensions, i) {
  return new Promise(
    function(resolve, reject){
      var index = i != null ? i : 0;
      if (index < extensions.length) {
        // More extensions to reload.
        reloadExtension(extensions[index].id).then(
          function() {
            refreshAux(extensions, ++index).then(
              function() {
                resolve();
              }
            );
          }
        );
      }
      // No more extensions to reload:
      else {
        resolve();
      }
    }
  );
}
function refresh (appNames, tabRefresh, refreshAll, i) {
  index =
  // Get required extensions data:
  getExtensionsByName(appNames).then(
    function(extensions) {
      // Reloads every extension:
      refreshAux(extensions).then(
        function() {
          // Refresh the page(s) depending on the configuration:
          if(tabRefresh){
            setTimeout(function() {
              console.log('refreshing');
              refreshTabs(refreshAll);
            }, 1000);
          }
        }
      );
    }
  ).catch(
    function(error) {
      throw new Error(error);
    }
  )
}

function execute (request) {
  var command = JSON.parse(request);

  switch (command.method) {
    case 'REFRESH':
      refresh(command.params.appNames, command.params.tabRefresh, command.params.refreshAll);
      break;
    case 'DISABLE':
      console.log('Disabling extension.');
      break;
    default:
      console.log('Bad request.');
  }
}
