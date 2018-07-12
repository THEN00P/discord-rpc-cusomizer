class render {
    start() {
        if(document.querySelector('.developers') && typeof require != 'function') {
            close();
        }
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(typeof require == 'function') {
                    const { ipcRenderer } = require('electron');
                    if(mutation.addedNodes &&
                       mutation.addedNodes[0] &&
                       mutation.addedNodes[0].querySelector
                       ) {
                        if(mutation.addedNodes[0].querySelector('.section:nth-child(2) span.more-info')) {
                            mutation.addedNodes[0].querySelector('.section:nth-child(2) span.more-info').innerHTML = 'This is what the user sees under "Playing"'; 
                            document.querySelector('.section:nth-child(2) .input-group:first-child').insertAdjacentHTML('afterEnd', `<div class="input-group half">
                            <label class="label">Preview</label>
                            <div class="memberOnline">
                                <div class="contentWrapper">
                                    <span class="avatarWrapper">
                                        <div class="wrapper">
                                            <div class="image" style="background-image: url(&quot;https://i.imgur.com/zmfilFG.png;);"></div>
                                            <div class="online"></div>
                                        </div>
                                    </span>
                                    <div class="memberInner">
                                        <div class="nameTag">
                                            <span class="usernameOnline">Example Name</span>
                                        </div>
                                        <div class="activity" style="flex: 1 1 auto;">
                                            <div class="activityText">
                                                Playing 
                                                <strong>Example</strong>
                                            </div>
                                            <svg name="RichActivity" class="activityIcon" width="16" height="16" viewBox="0 0 16 16"><path class="activityIconForeground-qYIPPg" fill="currentColor" d="M6,7 L2,7 L2,6 L6,6 L6,7 Z M8,5 L2,5 L2,4 L8,4 L8,5 Z M8,3 L2,3 L2,2 L8,2 L8,3 Z M8.88888889,0 L1.11111111,0 C0.494444444,0 0,0.494444444 0,1.11111111 L0,8.88888889 C0,9.50253861 0.497461389,10 1.11111111,10 L8.88888889,10 C9.50253861,10 10,9.50253861 10,8.88888889 L10,1.11111111 C10,0.494444444 9.5,0 8.88888889,0 Z" transform="translate(3 3)"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>`)
                            
                            document.querySelector('input.Input').onkeyup = function() {
                                document.querySelector('.activityText strong').innerHTML = this.value;
                            }
                        }
                        if(mutation.addedNodes[0].querySelector('.action-btn.delete-application')) {
                            var count = 0;
                            document.querySelectorAll('.section-title, .my-app, .row').forEach(function(elem) {
                                if(elem.innerHTML.includes('Client ID')) {
                                    ipcRenderer.send('login', elem.querySelectorAll('.app-details div')[0].childNodes[2].nodeValue);
                                    elem.closest('.section').style.display = "none";
                                }
                                if(elem.innerHTML.includes('Whitelist')) {
                                    elem.closest('.section').style.display = "none";
                                }
                                if(elem.innerHTML.includes('Bot')) {
                                    elem.style.display = "none";
                                }
                                if(elem.innerHTML.includes('Redirect')) {
                                    elem.style.display = "none";
                                }
                                if(elem.innerHTML.includes('OAuth2-URL')) {
                                    elem.style.display = "none";
                                }
                                if(elem.innerHTML.includes('spectate')) {
                                    elem.closest('.section').style.display = "none";
                                }
                                if(elem.innerHTML.includes('cover image')) {
                                    elem.closest('.section').style.display = "none";
                                }
                            });
                            if(document.querySelector('.my-app:nth-child(9) .action-btn')) document.querySelector('.my-app:nth-child(9) .action-btn').click();
                        }
                        if(mutation.addedNodes[0].querySelector('.section.assets')) {
                            document.querySelector('.section.assets').insertAdjacentHTML('afterEnd', `
                            <div class="section cstm">
                                <div class="row">
                                    <div class="input-group">
                                        <label class="label">Update Rich Presence</label>
                                        <span class="more-info">If you don't want to use an atribute just leave it empty.</span></div>
                                </div>
                                <div class="row">
                                    <div class="theme-dark input-group half">
                                        <label class="label">Atributes</label>

                                        <div class="form-inputWrapper text-input">
                                            <span>
                                                <div class="form-input-wrapper">
                                                    <input id="details" type="text" class="Input TextInput" placeholder="First line" value="">
                                                </div>
                                            </span>
                                        </div>

                                        <div class="form-inputWrapper text-input">
                                            <span>
                                                <div class="form-input-wrapper">
                                                    <input id="state" type="text" class="Input TextInput" placeholder="Second line" value="">
                                                </div>
                                            </span>
                                        </div>

                                        <div class="form-inputWrapper text-input">
                                            <span>
                                                <div class="form-input-wrapper">
                                                    <input id="largeImageKey" type="text" class="Input TextInput" placeholder="Large image name" value="">
                                                </div>
                                            </span>
                                        </div>

                                        <div class="form-inputWrapper text-input">
                                            <span>
                                                <div class="form-input-wrapper">
                                                    <input id="smallImageKey" type="text" class="Input TextInput" placeholder="Small image name" value="">
                                                </div>
                                            </span>
                                        </div>

                                        <div class="form-inputWrapper text-input">
                                            <span>
                                                <div class="form-input-wrapper">
                                                    <input id="largeImageText" type="text" class="Input TextInput" placeholder="Large image popover" value="">
                                                </div>
                                            </span>
                                        </div>

                                        <div class="form-inputWrapper text-input">
                                            <span>
                                                <div class="form-input-wrapper">
                                                    <input id="smallImageText" type="text" class="Input TextInput" placeholder="Small image popover" value="">
                                                </div>
                                            </span>
                                        </div>

                                        <div class="action-btn form-submit" id="updateRpc">Update</div>
                                    </div>
                                    <div class="theme-dark input-group half">
                                        <label class="label">Preview</label>

                                        <div id="preview">
                                        </div>
                                </div>
                                
                            </div>
                            `);

                            document.querySelector('#updateRpc').onclick = () => {
                                let state1 = document.querySelector('#state').value,
                                    details1 = document.querySelector('#details').value,
                                    largeImageKey1 = document.querySelector('#largeImageKey').value,
                                    smallImageKey1 = document.querySelector('#smallImageKey').value,
                                    largeImageText1 = document.querySelector('#largeImageText').value,
                                    smallImageText1 = document.querySelector('#smallImageText').value;

                                let json = {
                                    details: details1,
                                    state: state1,
                                    largeImageKey: largeImageKey1,
                                    smallImageKey: smallImageKey1,
                                    largeImageText: largeImageText1,
                                    smallImageText: smallImageText1
                                }

                                for(let i in json) {
                                    if(json[i] == "") {
                                        delete json[i];
                                    }
                                }

                                if(count == 0) setTimeout(function(){ ipcRenderer.send('updateRPC', json) }, 500);
                                ipcRenderer.send('updateRPC', json);
                                count++;
                            }

                            document.querySelectorAll('.section.cstm input').forEach(function(elem) {
                                elem.onkeyup = function() {
                                    let name = document.querySelector('.h1').childNodes[1].nodeValue,
                                        state = document.querySelector('#state').value,
                                        details = document.querySelector('#details').value,
                                        largeImageKey = document.querySelector('#largeImageKey').value,
                                        smallImageKey = document.querySelector('#smallImageKey').value,
                                        largeImageText = document.querySelector('#largeImageText').value,
                                        smallImageText = document.querySelector('#smallImageText').value,
                                        largeSrc,
                                        smallSrc;

                                        document.querySelectorAll('.app-list-inner .item').forEach(function(elem) {
                                            if(elem.querySelector('.name').innerHTML == largeImageKey) {
                                                largeSrc = elem.querySelector('[class*=avatar][class*=large] [class^=image]').style.backgroundImage.match(/url\(([^)]+)\)/i)[1].replace(/\"/g, "");
                                            }
                                            if(elem.querySelector('.name').innerHTML == smallImageKey) {
                                                smallSrc = elem.querySelector('[class*=avatar][class*=large] [class^=image]').style.backgroundImage.match(/url\(([^)]+)\)/i)[1].replace(/\"/g, "");
                                            }
                                        });

                                    document.querySelector('#preview').innerHTML = `
                                    <div class="activityUserPopout">
                                        <div class="headerTextNormal">Playing a game</div>
                                        <div class="bodyNormal">
                                            ${largeImageKey !== "" ?`<div class="assets">
                                                <img ${largeImageText !== "" ? 'title="okO"' : ""} src="${largeSrc}" class="assetsLargeImageUserPopout">
                                                ${smallImageKey !== "" ? `<img ${smallImageText !== "" ? 'title="ok2O"': ""} src="${smallSrc}" class="assetsSmallImageUserPopout">` : ""}
                                            </div>` : ""}
                                            <div class="contentImagesUserPopout" style="flex: 1 1 auto;">
                                                <div class="nameNormal" title="${name}">${name}</div>
                                                ${details !== "" ? '<div title="'+details+'" class="details">'+details+'</div>' : ""}
                                                ${state !== "" ? `
                                                <div class="state">
                                                    <span title="${state}">${state}</span>
                                                </div>` : ""}
                                            </div>
                                        </div>
                                    </div>
                                    `;
                                }
                            });
                        }
                    }
                }
            });    
        });
        observer.observe(document, { attributes: true, childList: true, characterData: true, subtree: true });
    }
}

script = new render;
script.start();