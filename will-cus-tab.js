if (document.querySelector('.tabbed-box-bar')) {

  if (document.querySelector('.will-tab-menu')) {
    /*客製選單觸發器*/
    let oldTabMenu = document.querySelectorAll('.tabbed-box-tab .paragraph');
    let newTabMenu = document.querySelectorAll('.will-tab-menu');

    for (var i = 0; i < newTabMenu.length; i++) {
      newTabMenu[i].setAttribute('level', i);
      newTabMenu[i].addEventListener('click', changeTab)
    }

    function changeTab() {
      var level = this.getAttribute('level');
      oldTabMenu[level].click();
      document.querySelector('.active.will-tab-menu').classList.remove('active');
      this.classList.add('active')
    }
  }

  if (/(lectures)|(articles)/.test(window.location)) { willFetchContentV2() }
  else { willFetchContentV1(); }
}

/* 輸出無圖 */

async function willFetchContentV1() {

  var news = document.querySelectorAll('.will-cus-news')
  for (var j = 0; j < news.length; j++) {
    var newsUrl = news[j].getAttribute('fetch');
    await fetch(newsUrl).then(x => x.text()).then(html => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var newsTitles = doc.querySelectorAll('.blog-body h2.blog-title a');
      var newsDates = doc.querySelectorAll('.blog-body p.blog-date .date-text');
      var newsHTML = [];
      for (var i = 0; i < newsTitles.length && i < 5; i++) {
        var insertHTML = `<div class="news-box"><a href="${newsTitles[i].href}"><div class="content-date">${newsDates[i].innerText}</div><div class="content-title">${newsTitles[i].innerText}</div></a></div>`;
        newsHTML.push(insertHTML)
      }
      news[j].innerHTML = newsHTML.join('')
    })
  }

}

/* 輸出有圖 */
async function willFetchContentV2() {
  var blogUrl = `/blog-${window.location.href.replace(/^.+\/(.+)\.html$/, '$1')}`;
  var blogCate = [];
  var cateUrl = [];
  await fetch(blogUrl).then(x => x.text()).then(html => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var blogList = doc.querySelectorAll('.blog-category-list a');
    for (var i = 0; i < blogList.length; i++) {
      blogCate.push(blogList[i].innerText);
      cateUrl.push(blogList[i].href);
    }
  })

  var news = document.querySelectorAll('.will-cus-news');
  var menus = document.querySelectorAll('.will-tab-menu');
  for (var i = 0; i < menus.length; i++) {
    var menuItem = menus[i].innerText;
    var cateIndex = blogCate.indexOf(menuItem);
    news[i].href = cateUrl[cateIndex];
  }
  for (var j = 0; j < news.length; j++) {
    var newsUrl = news[j].getAttribute('fetch');
    await fetch(newsUrl).then(x => x.text()).then(html => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var newsContent = doc.querySelectorAll('.blog-content')
      var newsTitles = doc.querySelectorAll('.blog-body h2.blog-title a');
      var newsDates = doc.querySelectorAll('.blog-body p.blog-date .date-text');
      var newsHTML = [];
      for (var i = 0; i < newsTitles.length && i < 5; i++) {
        var insertHTML = `<div class="articles-box">
        <div class="left-col">
          <a href="${newsTitles[i].href}">
            <img src="${newsContent[i].querySelector('a img').getAttribute('src')}">
          </a>
        </div>
        <div class="right-col">
          <div class="content-title">
            <a href="${newsTitles[i].href}">${newsTitles[i].innerText}</a>
          </div>
          <div class="content-paragraph">${newsContent[i].querySelector('.paragraph').innerText.substr(0, 50)}...</div>
          <a href="${newsTitles[i].href}">
            <button class="read-more" type="button">Read More</button>
          </a>
          <div class="content-date">於${newsDates[i].innerText}</div>
        </div>
      </div>`
        newsHTML.push(insertHTML)
      }
      news[j].innerHTML = newsHTML.join('')
    })
  }
}
