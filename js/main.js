'use strict';

function initPage() {
    createProjects();
    renderProjs();
}

function renderProjs() {
    var strHTML = gProjs.map(function(proj, index) {
        return `<div class="col-md-4 col-sm-6 portfolio-item" onclick="renderProjModal('${proj.id}')">
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

function onSubmit() {
    var mail = $('input#e-mail').val();
    var subject = $('input#subject').val();
    var content = $('input#message-body').val();

    var url = `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}&su=${subject}&body=${content}&bcc=someone.else@example.com`;

    window.open(url, '_blank');
}