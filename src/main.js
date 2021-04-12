$('.addButton')
.on('click',()=>{
    console.log(1)
    let url=window.prompt("你想干啥？")
    if(url.indexOf('https')!==0){
        url = 'https://' + url
    }
    console.log(url)
    const $siteList = $('.siteList')
    const $lastLi = $siteList.find('li.last')
    const $li = $(`<li>
    <a href="${url}">
                    <div class="site">
                        <div class="logo">${url[0]}</div>
                        <div class="link">${url}</div>
                    </div>
                </a>
    </li>`).insertBefore($lastLi)
})