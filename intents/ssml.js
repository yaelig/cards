module.exports = function (tex) {
    let x
    let keep
    keep=tex.slice(0,7)
    tex=tex.slice(0, 0) + "<speak>" +keep+ tex.slice(7, tex.length + 7) + "</speak>"
    for (let index = 0; index < tex.length; index++) {

        let element = tex[index]
        if (element == `,`) {
            element = '<break time="400ms" />'
            x=tex.slice(index,tex.length)
            tex = tex.slice(0, index) + element +x
            index = index + element.length;
        }
        else if (element == `.`) {
            element = '<break time="700ms" />'
            x=tex.slice(index,tex.length)
            tex = tex.slice(0, index) + element +x
            index = index + element.length;
        }
        else if(element==`e`&& tex[index+1]==`t`&&tex[index]==`c`)
        {
            x=tex.slice(index,tex.length)
            tex = tex.slice(0, index) + '<sub alias="etecetra">etc</sub>' +x
            index = index + element.length;
        }
        else if(element==`?`)
        {
            element = '<break time="250ms" />'
            x=tex.slice(index,tex.length)
            tex = tex.slice(0, index) + element +x
            index = index + element.length;
        }
        // else if(element==`!`)
        // {
        //     element = '<emphasis level="moderate">'
        //     let y='</emphasis>'
        //     x=tex.slice(index,tex.length-8)
        //     tex = tex.slice(0, index) + element +x+y+"</speak>"
        //     index = index + element.length;
        // }

    }
    // tex.forEach(element => {
    //     if(element==',')
    //     {
    //         element='<break time="2" />'
    //     }
    //     else if(element=='etc')
    //     {
    //         element='etcetera'
    //     }
    //     else if(element=='.')
    //     {
    //         element='<break time="1" />'
    //     }
    // });
    return tex;
}
