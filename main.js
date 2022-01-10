//즉시 실행 함수
(()=>{
    let yOffset = 0;//window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0;//현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

    const sceneInfo = [
        {
            //0
            type:'sticky',
            heightNum:5,//브라우저 높이의 5배로 scollheight 셋팅
            scrollHeight:0,
            objs:{
                container:document.querySelector('#scroll-section-0'),
                messageA:document.querySelector('#scroll-section-0 .main-message.a'),
                messageB:document.querySelector('#scroll-section-0 .main-message.b'),
                messageC:document.querySelector('#scroll-section-0 .main-message.c'),
                messageD:document.querySelector('#scroll-section-0 .main-message.d')
            },
            values:{
                messageA_opacity:[0, 1]
            }
        },
        {
            //1
            type:'nomal',
            heightNum:5,//브라우저 높이의 5배로 scollheight 셋팅
            scrollHeight:0,
            objs:{
                container:document.querySelector('#scroll-section-1')
            }
        },
        {
            //2
            type:'sticky',
            heightNum:5,//브라우저 높이의 5배로 scollheight 셋팅
            scrollHeight:0,
            objs:{
                container:document.querySelector('#scroll-section-2')
            }
        },
        {
            //3
            type:'sticky',
            heightNum:5,//브라우저 높이의 5배로 scollheight 셋팅
            scrollHeight:0,
            objs:{
                container:document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout(){
        //각 스크롤 섹션의 높이 세팅(scrollHeight)
        for(let i = 0; i < sceneInfo.length; i ++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height=`${sceneInfo[i].scrollHeight}px`
        }

        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= scrollY){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`)
    }


    function scrollLoop(){
        prevScrollHeight = 0;
        for(let i = 0; i<currentScene; i ++){
            // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        //console.log(prevScrollHeight)
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
        }
        if(yOffset < prevScrollHeight){
            if(currentScene === 0) return;//바운스 효과 중지
            currentScene--;
        }
        // console.log(currentScene);
        
        document.body.setAttribute('id',`show-scene-${currentScene}`)
        playAnimation();
    }
    function calcVaues(values, currentYOffset){
        let rv;
        //현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        let scrolllRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        rv = scrolllRatio *(values[1] - values[0]) + values[0];
        return rv;
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        // console.log(currentYOffset)
        switch(currentScene){
            case 0:
                // console.log('0 play');
                let messageA_opacity_in =calcVaues(values.messageA_opacity,currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                break;
            case 1:
                // console.log('1 play');
                break;        
            case 2:
                // console.log('2 play');
                break;
            case 3:
                // console.log('3 play');
                break;
    }
    }    


    window.addEventListener('scroll',()=>{
        yOffset = window.pageYOffset;
        //console.log(yOffset);
        scrollLoop();
    });
    // window.addEventListener('load',setLayout)
    window.addEventListener('DOMContentLoaded',setLayout)
    window.addEventListener('resize',setLayout);
    setLayout();
})();