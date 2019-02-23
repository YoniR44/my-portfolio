'use strict';

function initPage() {
    createProjects();
    renderProjs();
}

function renderProjs() {
    var strHTML = gProjs.map(function(proj, index) {
        return `<div data-aos="flip-right" data-aos-duration="1600" class="col-md-4 col-sm-6 portfolio-item" onclick="renderProjModal('${proj.id}')">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/0${index + 1}-full.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.type}</h4>
          <p class="text-muted"></p>
        </div>
      </div>`
    });

    $(`.row-project-portfolio`).html(strHTML);
}

function renderProjModal(projId) {
  var proj = getProjById(projId);
  var $modal = $('.modal');
  $modal.find('h2').text(proj.name);
  $modal.find('.item-intro').text(proj.title);
  $modal.find('.img-fluid').attr('src', proj.imgUrl);
  
  var x = $modal.find('.proj-link').attr('href', proj.link);
  console.log(x);
  
  $modal.find('p').text(proj.desc);
  $modal.find('li').text(proj.publishedAt);
}

function onSubmit() {
    var mail = $('input#e-mail').val();
    var subject = $('input#subject').val();
    var content = $('textarea#message-body').val();

    var url = `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}&su=${subject}&body=${content}&bcc=someone.else@example.com`;

    window.open(url, '_blank');
}