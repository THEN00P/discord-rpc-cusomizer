const {BrowserWindow, app} = require('electron');
const {ipcMain} = require('electron');
const {Client} = require('discord-rpc');
const rpc      = new Client({transport: 'ipc'});
const fs       = require('fs');

let appID,
    mainWindow,
    WindowSettings = {
        width: 850,
        height: 680,
        backgroundColor: '#FFF',
        useContentSize: false,
        autoHideMenuBar: true,
        resizable: true,
        center: true,
        frame: true,
        alwaysOnTop: false,
        title: 'Discord Rich Presence Customizer',
        icon: __dirname + '/icon.ico',
        webPreferences: {
            nodeIntegration: false,
            plugins: true,
        },
    },
    nodeSettings = {
        width: 850,
        height: 680,
        backgroundColor: '#FFF',
        useContentSize: false,
        autoHideMenuBar: true,
        resizable: true,
        center: true,
        frame: true,
        alwaysOnTop: false,
        title: 'Discord Rich Presence Customizer',
        icon: __dirname + '/icon.ico',
        webPreferences: {
            nodeIntegration: true,
            plugins: true,
        },
    },
    login = (tries = 0) => {
        if (tries > 10) return;
        tries++;
        rpc.login(appID).catch((e) => setTimeout(function() {login(tries)}, 1000));
    }
 
ipcMain.on('login', (event, clientID) => {
    appID = clientID;
    login();
});

ipcMain.on('updateRPC', (event, json) => {
        
    if (!rpc) return;

    rpc.setActivity(json);
    
});

app.on('ready', () => {
    mainWindow = new BrowserWindow(WindowSettings);
    mainWindow.loadURL("https://discordapp.com/developers/applications/me", {userAgent: 'Chrome'});
    
    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.webContents.executeJavaScript(fs.readFileSync(__dirname+'/render.js') + "var elem = document.createElement('style'); elem.innerHTML = `"+fs.readFileSync(__dirname+'/simplify.css')+"`; document.head.append(elem);");
    });

    mainWindow.on('close', function() {
        mainWindow = null;
        nodeWindow = new BrowserWindow(nodeSettings);
        nodeWindow.loadURL("https://discordapp.com/developers/applications/me", {userAgent: 'Chrome'});
    
        nodeWindow.webContents.on('did-finish-load', function() {
            nodeWindow.webContents.executeJavaScript(fs.readFileSync(__dirname+'/render.js') + "var elem = document.createElement('style'); elem.innerHTML = `"+fs.readFileSync(__dirname+'/simplify.css')+"`; document.head.append(elem);");
        });

        nodeWindow.on('close', function() {
            app.on('window-all-closed', app.quit);
            app.on('before-quit', () => {
                mainWindow.removeAllListeners('close');
                mainWindow.close();
            });
        });
    });
});