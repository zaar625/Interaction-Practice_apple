//즉시 실행 함수
(()=>{
    let yOffset = 0;//window.pageYOffset 대신 쓸 변수
    const sceneInfo = [
        {
            //0
            type:'sticky',
            heightNum:5,//브라우저 높이의 5배로 scollheight 셋팅
            scrollHeight:0,
            objs:{
                container:document.querySelector('#scroll-section-0')
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
        //각 스크롤 섹션의 높이 세팅
        for(let i = 0; i < sceneInfo.length; i ++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height=`${sceneInfo[i].scrollHeight}px`
        }
        console.log(sceneInfo);
    }


    function scrollLoop(){
    }
    window.addEventListener('resize',setLayout);
    window.addEventListener('scroll',()=>{
        yOffset = window.pageYOffset;
        console.log(yOffset);
        scrollLoop();
    })
    setLayout();
})();