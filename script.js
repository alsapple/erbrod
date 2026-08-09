const API_KEY = '본인의_디코딩된_인증키를_여기에_넣으세요';

// 주요 지역별 기상청 격자 X, Y 좌표
const regions = {
    seoul: { name: '서울시', nx: 60, ny: 127 },
    busan: { name: '부산시', nx: 98, ny: 76 },
    daegu: { name: '대구시', nx: 89, ny: 90 },
    gwangju: { name: '광주시', nx: 58, ny: 74 }
};

document.getElementById('searchBtn').addEventListener('click', getWeather);

function getWeather() {
    const selectedKey = document.getElementById('regionSelect').value;
    const region = regions[selectedKey];
    
    document.getElementById('locationName').innerText = `지역: ${region.name}`;
    document.getElementById('tempDisplay').innerText = '현재 기온: 조회 중...';

    const now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let day = String(now.getDate()).padStart(2, '0');
    let baseDate = `${year}${month}${day}`;
    let baseTime = "0500"; 

    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=60&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${region.nx}&ny=${region.ny}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.response.body.items.item;
            const tempItem = items.find(item => item.category === 'TMP');
            
            if (tempItem) {
                document.getElementById('tempDisplay').innerText = `현재 기온: ${tempItem.fcstValue}°C`;
            } else {
                document.getElementById('tempDisplay').innerText = '기온 정보를 찾을 수 없습니다.';
            }
        })
        .catch(error => {
            console.error('에러 발생:', error);
            document.getElementById('tempDisplay').innerText = '데이터를 불러오는데 실패했습니다.';
        });
}
