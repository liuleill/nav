const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
//一进入当前页面的时候获取x值，
const x = localStorage.getItem('x')
const xObject = JSON.parse(x) //JSON.parse把字符串x变成对象xObject
console.log('x:' + x)
console.log('xObject:' + xObject)
//初始化的时候，x有值的时候，xObject是空，所以用 ||来获取后面的数组值
const hashMap = xObject || [//声明一个全局变量
    {logo:'A',logoType:'text',url:'https://www.acfun.cn'},
    {logo:'B',logoType:'image',url:'https://bilibili.com'},
]

const simplifyUrl = (url) =>{
    return url.replace('https://','')
           .replace('http://','')
           .replace('www.','')
           .replace(/\/.*/,'')
}

const render = () => {
    hashMap.forEach(node=>{
        const $li = $(`
                <li>
                    <a href="${node.url}" >
                        <div class="site">
                            <div class="logo">${simplifyUrl(node.url)[0].toUpperCase()}</div>
                            <div class="link">${simplifyUrl(node.url)}</div>
                        </div>
                    </a>
                </li>
        `).insertBefore($lastLi)
    })
}

render()

$('.addButton').on('click',()=>{
    console.log(1)
    let url=window.prompt("你想干啥？")
    if(url.indexOf('https')!==0){
        url = 'https://' + url
    }
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        logoType:'text',
        url:url
    })
    $siteList.find('li:not(.last)').remove()
    render()
});

//关闭页面的时候把当前的hashMap存到x里面
window.onbeforeunload = () =>{
    console.log(`页面要关闭了`)
    //把对象变成字符串用JSON.stringfy()
    const string = JSON.stringify(hashMap)
    /*查看下面四个值要勾选preserve log*/
    // console.log(hashMap)
    // console.log(typeof hashMap) //object
    // console.log(string)
    // console.log(typeof string) //类型是string

    //产看localStorage的值，要看控制台中Application
    //中的Storage中的local storage，对应x和string
    localStorage.setItem('x',string)
}