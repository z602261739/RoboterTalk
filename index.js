var sendKey = document.getElementsByClassName('send-input')[0];
sendKey.addEventListener('keyup', function (e) {
    if (e.keyCode == 13 && this.value != '') {
        renderSay('mine', this.value);
        ajax({
            url: 'https://developer.duyiedu.com/edu/turing/chat',
            method: 'get',
            data: {
                text: this.value
            },
            success: function (res) {
                renderSay('roboter', res.text);
            }
        })
        // $.ajax({
        //     url: 'https://developer.duyiedu.com/edu/turing/chat',
        //     method: 'get',
        //     dataType: 'json',
        //     data: {
        //         text: sendKey.value
        //     },
        //     success: function (res) {
        //         console.log(res)
        //         renderSay('roboter', res.text);
        //     }
        // })
        // this.value = '';
    }
}, false)

var sendButton = document.getElementsByClassName('send-button')[0];
sendButton.addEventListener('mouseup', function () {
    if (sendKey.value != '') {
        renderSay('mine', sendKey.value);
        ajax({
            url: 'https://developer.duyiedu.com/edu/turing/chat',
            method: 'get',
            data: {
                text: sendKey.value
            },
            success: function (res) {
                renderSay('roboter', res.text);
            }
        })
        sendKey.value = '';
    }
    
},false)


var content = document.getElementsByClassName('content')[0];
function renderSay(who, say) {
    var dicClass = who + ' clearfix';
    var img = "";
    if (who === 'mine') {
        img = "./1.1.jpg";
    } else {
        img = "./2.2.jpg";
    }
    var oDiv = document.createElement('div');
    oDiv.className = dicClass;
    oDiv.innerHTML =
        `<img src="${img}" alt="">
        <div class="say">
            ${say}
        </div>`
    content.appendChild(oDiv);
    content.scrollTop = content.scrollHeight - content.clientHeight;
}


