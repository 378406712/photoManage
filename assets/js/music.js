const ap = new APlayer({
    container: document.getElementById('aplayer'),
    theme: '#FADFA3',
    fixed: true,
    autoplay: false, //自动播放
    mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
    preload: 'auto', //预加载，可选值: 'none', 'metadata', 'auto'
    order: 'random', //音频循环顺序, 可选值: 'list'列表循环, 'random'随机循环
    loop: 'all', //音频循环播放, 可选值: 'all'全部循环, 'one'单曲循环, 'none'不循环
    lrcType: 3, //歌词传递方式,
    theme: 'red', 
  
    listMaxHeight: 90, //列表最大高度
    audio: [{
        name: '光るなら',
        artist: 'Goose house',
        url: '../assets/music/Goose house/光るなら/Goose house - 光るなら.flac',
        cover: '../assets/music/Goose house/光るなら/hikarunara.jpg',
        lrc:"../assets/music/Goose house/光るなら/光るなら.lrc"
    }, {
        name: '前前前世 ',
        artist: 'RADWIMPS',
        url: '../assets/music/RADWIMPS/前前前世/yourname.mp3',
        cover: '../assets/music/RADWIMPS/前前前世/yourname.jpg',
        lrc:"../assets/music/RADWIMPS/前前前世/yourname.lrc"
    },
    {
        name: 'コバルトの街',
        artist: 'Goose house',
        url: '../assets/music/Goose house/コバルトの街/Goose house - コバルトの街.mp3',
        cover: '../assets/music/Goose house/コバルトの街/コバルトの街.jpg',
        lrc:"../assets/music/Goose house/コバルトの街/コバルトの街.lrc"
    }]
});
