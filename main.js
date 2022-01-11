//즉시 실행 함수
(()=>{
    let yOffset = 0;//window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0;//현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
    let enterNewScene = false;//새로운 scene이 시작된 순간 true
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
                messageA_opacity:[0, 1, {start: 0.1, end: 0.2}],
                messageB_opacity:[0, 1, {start: 0.3, end: 0.4}]
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
            if(totalScrollHeight >= yOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`)
    }


    function scrollLoop(){
        enterNewScene = false;
        prevScrollHeight = 0;
        for(let i = 0; i<currentScene; i ++){
            // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        //console.log(prevScrollHeight)
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene++;
        }
        if(yOffset < prevScrollHeight){
            enterNewScene = true;//강의 제목: 스크롤 에니메이션 구현4
            if(currentScene === 0) return;//바운스 효과 중지
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`)
        }
         console.log(currentScene);
        
        if(enterNewScene) return;

        playAnimation();
    }
    function calcVaues(values, currentYOffset){
        let rv;
        //현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrolllRatio = currentYOffset /scrollHeight;

        if(values.length === 3){
            //start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start *scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv = (currentYOffset - partScrollStart) / partScrollHeight *(values[1] - values[0]) + values[0];
            }else if (currentYOffset < partScrollStart){
                rv = values[0];
            }else if (currentYOffset > partScrollEnd){
                rv = values[1];
            }
        }else{
            rv = scrolllRatio *(values[1] - values[0]) + values[0];
        }

        return rv;
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        console.log(currentScene)
        switch(currentScene){
            case 0:
                // console.log('0 play');
                let messageA_opacity_in =calcVaues(values.messageA_opacity,currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                console.log(messageA_opacity_in)
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