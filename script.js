const API_KEY = 'tGMuabKhkbKLnzpM8CFURLyFrL1TIFdqHd7kl2nFTjvD8RsI3oX+DQ6wec54tPtF4ScdBDivxovt9aSlNiBA9A==';

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
            if (!data.response || !data.response.body) {
                throw new Error('API 응답 형식 오류 (인증키를 확인하세요)');
            }
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
            document.getElementById('tempDisplay').innerText = '데이터 로드 실패 (F12 콘솔 확인)';
        });
}
