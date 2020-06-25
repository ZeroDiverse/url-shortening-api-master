let collections = document.querySelector('.shorten-url-collections');

refresh();

let btn = document.querySelector('#shorten-btn');

btn.addEventListener('click', () => {
    if (document.querySelector('.shorten-input-precis').validity.valid == false) {
        document.querySelector('.shorten-input-precis').classList.add('not-valid');
        document.querySelector('.absolute').style.display = 'block';
    }
    else {
        document.querySelector('.absolute').style.display = 'none';
        document.querySelector('.shorten-input-precis').classList.remove('not-valid');
        let url = document.querySelector('.shorten-input-precis').value;
        if(url.startsWith('https://')){
            url = url.slice(8);
        }
        const rawResponse = fetch(`https://url-shortening-api-master-back.herokuapp.com/${url}`, {
            method: 'POST',
        });
        refresh();
    }
});

let btnsCopy = document.querySelectorAll('.copy');




function copyToClipBoard(ele) {
    var range = document.createRange();

    /* Get the text field */
    let copyText = ele.parentElement.querySelector(".link");

    range.selectNode(copyText);

    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text

    /* Copy the text inside the text field */
    document.execCommand("copy");
}




function refresh(){
    collections.querySelectorAll('*').forEach(n => n.remove());
    fetch('https://url-shortening-api-master-back.herokuapp.com/')
    .then(function (response) {
        response.json()
            .then(function (value) {
                value.forEach(element => {
                    let collection = document.createElement('div');
                    collection.className = 'shorten-url-collection';
                    let p = document.createElement('p');
                    p.innerHTML = 'https://' + element.url;
                    collection.appendChild(p);
                    let div2 = document.createElement('div');
                    div2.className = 'shorten-url-main';
                    let p2 = document.createElement('p');
                    let a = document.createElement('a');
                    a.className = 'link';
                    a.innerHTML = element.shortened_url;
                    p2.appendChild(a);
                    let button = document.createElement('button');
                    button.className = 'copy';
                    button.innerText = 'Copy';
                    button.addEventListener('click', () => {
                            if (!button.classList.contains('copied')) {
                                button.classList.add('copied');
                                button.innerHTML = 'Copied!';
                                copyToClipBoard(button);
                            }
                            else {
                                button.classList.remove('copied');
                                button.innerHTML = 'Copy';
                            }
                    
                        });
                    div2.appendChild(p2);
                    div2.appendChild(button);
                    collection.append(div2);
                    collections.appendChild(collection);
                })
            });
    });



}
