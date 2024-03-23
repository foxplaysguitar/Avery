let staffDatas = {
    '謝政廷':{
        'name':'謝政廷',
        'career':'心健中心執行長 / 芳蘭心理諮商所所長',        //請輸入個人職稱，不可斷行
        'quote':`測試測試`,         //放個人語錄，可斷行
        'major':'兒童心理諮商,兒童心理諮商,沙盤治療,親師諮詢,表達性藝術治療',         //放個人專長，專長之間請用逗點分開
        'pageUrl':''       //放個人網站,不需包含網域 https://www.psychntue.com
    }
}

if(document.querySelector('.staffs')) importStaffData()

function importStaffData(){
    var staff = document.querySelectorAll('.staffs');
    for(var i=0; i<staff.length; i++){
        var staffName = staff[i].getAttribute('name');
        if(staffDatas[staffName]){
            var staffData = staffDatas[staffName];
            var skills = staffData.major.split(',').filter(x => x != '').map(x => `<h4 class="skills">${x}</h4>`).join('')
            var htmlName = `<h3>${staffData.name}</h3>`;
            var htmlCareer = `<p>${staffData.career}</p>`;
            var htmlQuote = `<blockquote class="cus-quote">${staffData.quote}</blockquote>`;
            var htmlSkills = `<div class="skills-box">${skills}</div>`
            staff[i].innerHTML = htmlName + htmlCareer + htmlQuote + htmlSkills;
            console.log(`${staffName}資訊輸入完成`)
        }
        else{
            console.log(`無人員${staffName}的資訊`)
            continue;
        }
    }
}
