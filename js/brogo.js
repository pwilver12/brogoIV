// Page load functions
$(document).ready(function(){
	bannerSize();

	// Parallax scrolling (mobile)
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('.loon[data-type="background"]').each(function(){
			// Original background position
			var yPos = $('.loon').css('backgroundPosition').split(' ');
			$(window).scroll(function() {
				var $banner = $('.loon[data-type="background"]');
				var yOffset = -(($(window).scrollTop()*100) / $(window).height());

				// Put together our final background position
				var setLoon = '50% ' + (parseInt(yPos[1])+yOffset) + '%';
				// console.log(setLoon);

				// Move the background
				$banner.css({ backgroundPosition: setLoon });
	        });
	    });

	    $('.argonath[data-type="background"]').each(function(){
	    	// Original background position
	    	var yPos = $('.argonath').css('backgroundPosition').split(' ');
			$(window).scroll(function() {
				var $banner = $('.argonath[data-type="background"]');
				var bottom = $(window).scrollTop() - $('.argonath').offset().top;
				var yOffset = (bottom /$(window).height())*100;

				// Put together our final background position
				var setArgonath = '59% ' + (parseInt(yPos[1])-yOffset) + '%';

				// Move the background
				$banner.css({ backgroundPosition: setArgonath });
			});
		});
	}

	// Parallax scrolling on desktop
	else {
		$('.loon[data-type="background"]').each(function(){
			$(window).scroll(function() {
				var $banner = $('.loon[data-type="background"]');
				var yPos = -($(window).scrollTop() / $banner.data('speed'));

				// Put together our final background position
				var setLoon = '50% ' + yPos + 'px';

				// Move the background
				$banner.css({ backgroundPosition: setLoon });
	        });
	    });

	    $('.argonath[data-type="background"]').each(function(){
	    	$(window).scroll(function(){
	    		var $banner = $('.argonath[data-type="background"]');
	    		var bottom = $(window).scrollTop() - $('.argonath').offset().top;
	    		var yPos = -(bottom / $banner.data('speed'));

	    		// Put together our final background position
				var setArgonath = '50% ' + yPos + 'px';

				// Move the background
				$banner.css({ backgroundPosition: setArgonath });
			});
		});
	}

	// Ring animation
	$(window).scroll(function(){
		var startRing = $('.one-ring').offset().top - ($(window).height()/2);
		var diff = ($(window).scrollTop() - startRing);
		var ringRotate = ((diff/300)*90);
		var translate = 'translate(-100%, -50%)';
		var ringWidth = parseInt($('.ring-img').css('width'));

		if (diff <= 0) {
			$('.one-ring').css('visibility', 'hidden');
			$('.ring-img').css({ left: 0, opacity: 0, '-webkit-transform': translate+' rotate(0deg)' });
		}
		else if (diff >= ($(window).width()+ringWidth)) {
			$('.ring-img').css({ left: ($(window).width()+ringWidth), opacity: 1 });
		}
		else if ($(window).scrollTop() > startRing && diff >= 0) {
			$('.one-ring').css('visibility', 'visible');
			$('.ring-img').css({ left: diff, opacity: (diff/ringWidth), '-webkit-transform': translate+' rotate('+ringRotate+'deg)' });
		}
	});

	// Gollum animation
	$(window).scroll(function(){
		var startGollum = $('.one-ring').offset().top - ($(window).height()/2);
		var diff = $(window).scrollTop() - startGollum;
		var gollumHeight = parseInt($('.gollum-img').css('height'));
		var cycle = ($(window).width()/6);
		var rightInitial = ((diff-cycle)/(cycle*2))*(gollumHeight/2);
		var rightAfter = ((diff - (cycle*4))/(cycle*2))*(gollumHeight/2);

		if (diff <= 0) {
			$('.gollum-img').css({ right: 0, opacity: 0 });
		}
		else if (diff > cycle && rightInitial <= (gollumHeight/2)) {
			$('.gollum-img').css({ right: rightInitial, opacity: diff/(cycle*2) });
		}
		// else if ($(window).scrollTop() > startGollum && diff < (gollumHeight/2)) {
		// 	$('.gollum-img').css({ right: diff, opacity: (diff/(gollumHeight/3)) });
		// }
		else if (rightInitial >= (gollumHeight/2) && diff < (cycle*4)) {
			$('.gollum-img').css({ right: (gollumHeight/2), opacity: 1 });
		}
		else if (diff >= (cycle*4)) {
			$('.gollum-img').css({ right: (gollumHeight/2) - rightAfter });
		}

		// Gollum quote opacities
		if ($(window).scrollTop() >= (startGollum + ($(window).height()/3))) {
			var startQuote = $(window).scrollTop() - (startGollum + ($(window).height()/3));

			if (startQuote > 0) {
				$('#quote1').css('opacity', (startQuote/cycle));
			}
			if (startQuote > cycle) {
				$('#quote1').css('opacity', 1-((startQuote-cycle)/cycle));
				$('#quote2').css('opacity', (startQuote-cycle)/cycle);
			}
			if (startQuote > cycle*2) {
				$('#quote2').css('opacity', 1-((startQuote-cycle*2)/cycle));
				$('#quote3').css('opacity', (startQuote-cycle*2)/cycle);
			}
			if (startQuote > cycle*3) {
				$('#quote3').css('opacity', 1-((startQuote-cycle*3)/cycle));
				$('#quote4').css('opacity', (startQuote-cycle*4)/cycle);
			}
		}
		else {
			$('.gollum-quote').css('opacity', '0');
		}
	});
});
// End page load functions

var windowInitial = $(window).width();

// Banner sizing on window resize
$(window).resize(function(){
	bannerSize();

	var windowWidth = $(window).width();

	// Mobile nav behavior when window resizes
	if (windowWidth > 767) {
		$('.header-nav ul').css('display','inline-block');
	}
	if ((windowWidth <= 767) && (windowInitial > 767)){
		$('.header-nav ul').hide();
	}
});

// Banner sizing
function bannerSize() {
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	$('.banner-img').css('height', windowHeight);
	$('.one-ring').css('height', (windowHeight+windowWidth+200));
}

//Main nav hover effects
$('.header-nav a').hover(function(){
		$(this).addClass('nav-hover');
	}, function(){
		$(this).removeClass('nav-hover');
	}
);

// Mobile nav toggle
$('.mobile-nav').click(function(){
	$('.header-nav ul').slideToggle();
	$('.burger-nav').toggleClass('active-nav');
});

// Hide mobile nav when menu item is selected
$('.header-nav a').click(function(){
	if ($(window).width() <= 767) {
		$('.header-nav ul').hide();
	}
	$('.burger-nav').removeClass('active-nav');
});


// Scroll to nav links
var url = $(location).attr('href');
var index = $('#index').attr('href');

$('#index').click(function(e){
	if (url == index) {
		e.preventDefault();
		$('html, body').animate({
	        scrollTop: $("body").offset().top
	    }, 500);
	}
});

$("#bros").click(function(e) {
	if (url == index) {
		e.preventDefault();
		var windowHeight = $(window).height();
    	if ($(window).width() > 767) {
			$('html, body').animate({
        		scrollTop: windowHeight - 80
    		}, 500);
		}
		else {
			$('html, body').animate({
        		scrollTop: windowHeight - 65
    		}, 500);
		}
	}
});
// End scroll to nav links

// Hide Bros link on non-index pages
if (url != index) {
	$('#bros').parent('li').hide();
}

// Team selections
var randomNames = ['ben', 'dangy', 'dave', 'ethan', 'joe', 'nick', 'patty', 'scotty', 'timmy', 'tommy'];
var i = 0;

$('.banner-img h2').click(function(){
	if ($.isEmptyObject(randomNames)) {
		return false;
	}
	else {
		var choice = Math.floor((Math.random()*randomNames.length));
		i++;

		$('.banner-img h2').html(randomNames[choice]);
		$('.banner-img ul').css('display','inline-block').append('<li>'+i+'.&nbsp;'+randomNames[choice]+'</li>');

		randomNames.splice(choice,1);
	}
});
// End team selections

// Clicking character bios
$('.team-bios li').click(bioItem);

function bioItem() {
	var otherItems = $('.team-bios li').not(this);
	otherItems.children('p').removeClass('slide');
	$(this).children('p').toggleClass('slide');
}
// End character bios

// Settle disputes
var options = ['rock','paper','scissors'];

// On button click, run RPS function
$('#decision').click(result);

// Select current drop-down value when clicking away on mobile


function result() {
	var chaSelected = $('#cha option:selected');
	var oppSelected = $('#opp option:selected');

	// Validation of drop-down choices
	$('.team-drop-down').removeClass('validate');

	if (chaSelected.val() == oppSelected.val()) {
		$('.team-drop-down').addClass('validate');
		return false;
	}
	else if (chaSelected.val() == 0 || oppSelected.val() == 0) {
		if (chaSelected.val() == 0) {
			$('#cha').parent('.team-drop-down').addClass('validate');
		}
		else {
			$('#opp').parent('.team-drop-down').addClass('validate');
		}
		return false;
	}
	else {
		var cha = options[Math.floor((Math.random()*3))];
		var opp = options[Math.floor((Math.random()*3))];

		// Challenger updates
		$('.challenger img').attr('src', 'images/disputes/'+cha+'.png');
		$('.challenger h4').html(chaSelected.html());

		// Opponent updates
		$('.opponent img').attr('src', 'images/disputes/'+opp+'.png');
		$('.opponent h4').html(oppSelected.html());

		// Team choices div fade out
		$('.team-choices').css('opacity', 0);

		// Results div enter
		setTimeout(function(){
			// Team choices hide div
			$('.team-choices').hide();
			$('.results').css({ opacity: 1, 'transform': 'translate(-50%, 0)' });
		}, 500);

		// tie
		if (cha == opp) {
			$('.results > p').html('"Alright, we\'ll call it a <a href="https://www.youtube.com/watch?v=bh2tUipUnaI" target="_blank">draw</a>."');
		}
		// challenger wins
		else if ((cha=='rock' && opp=='scissors') || (cha=='paper' && opp=='rock') || (cha=='scissors' && opp=='paper')) {
			$('.results > p').html('"There is only one Lord of the Ring..."<br><span style="color: #E9D02D; text-transform: uppercase;">'+$('#cha > option:selected').html()+'</span> win.');
		}
		// opponent wins
		else if ((cha=='rock' && opp=='paper') || (cha=='paper' && opp=='scissors') || (cha=='scissors' && opp=='rock')) {
			$('.results > p').html('"I didn\'t think it would end this way."<br><span style="color: #E9D02D; text-transform: uppercase;">'+$('#opp > option:selected').html()+'</span> win.');
		}
	}
}

// Change reset button HTML on mobile
if($(window).width() <= 767) {
	$('#again').html('<<');
	$('#verdict').prependTo('.results');
}
else {
	$('#verdict').appendTo('.results');
}

$('#again').click(reset);

function reset() {
	if ($('.challenger img').attr('src') == $('.opponent img').attr('src')) {
		result();
	}
	else {
		// Fly-out 'results' div
		$('.results').css({ opacity: 0, 'transform': 'translate(-50%, -100%)' });
		// Reset team selections
		$('#cha, #opp').val(0);

		// Fade in team choices div
		setTimeout(function(){
			// Team choices hide div
			$('.team-choices').show();
		}, 500);
		setTimeout(function(){
			// Team choices hide div
			$('.team-choices').css('opacity', 1);
		}, 750);
	}
}


