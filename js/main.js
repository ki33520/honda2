$.extend({
	testAct: function(str,reg){
		return(reg.test(str));
	},
	testBasic: function(str){
		var bl = str ? true : false;
		return(bl);
	},
	testMail: function(str){
		var myReg = /^[.-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
		return($.testAct(str,myReg));
	},
	testPass: function(str){
		var myReg = /^[a-z0-9_-]{3,18}$/;
		return($.testAct(str,myReg));
	},
	testNumber: function(str){
		var myReg = /^[0-9]/;
		return($.testAct(str,myReg));
	},
	testMobile: function(str){
		var myReg = /^(1(([35][0-9])|(47)|[8][0123456789]))\d{8}$/;
		return($.testAct(str,myReg));
	},
	testsmsNumber: function(str){
		var myReg = /^[0-9]{6}$/;
		return($.testAct(str,myReg));
	},
	QueryString: function(str){
		var sValue=location.search.match(new RegExp("[\?\&]"+str+"=([^\&]*)(\&?)","i"));
		return sValue?sValue[1]:sValue;
	}
});
var appId,timestamp,nonceStr,signature,
	voiceStatus = true,
	indexUrl = 'http://hide.dzhcn.cn/honda/',
	jssdkUrl = 'http://sovita.dzhcn.cn/wechat_api/get_jssdk.php',
	ajaxUrl = indexUrl+'callback.php',
	smsType = 'getSmsCode',
	submitType = 'submit'
	boardType = 'Leaderboard2',
	voteType = "Vote",
	oilType = "Oil2",
	pageHref = window.location.origin+window.location.pathname;
$.ajax({
	url: jssdkUrl,
	type:'get',
	dataType:'jsonp',
	data:{url:pageHref},
	success:function(data){
		console.log(data)
		timestamp=data.timestamp;
		nonceStr=data.nonceStr;
		signature=data.signature;
		appId = data.appId;
		weixinShare();
	}
});
function weixinShare(){
	wx.config({
		debug: true,
		appId: appId,
		timestamp: timestamp,
		nonceStr: nonceStr,
		signature: signature,
		jsApiList: [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ'
		]
	});
	var shareTitle = '选出你的节能科技之星',
		shareDesc = '2016第十届Honda中国节能竞技大赛最佳设计奖评选',
		shareImg = indexUrl+"phase2/images/share_img.jpg";
	wx.ready(function () {
		wx.onMenuShareTimeline({
			title: shareTitle,
			desc: shareDesc,
			link: pageHref,
			imgUrl: shareImg,
			success: function () {
			},
			cancel: function () {
			}
		});
		wx.onMenuShareAppMessage({
			title: shareTitle,
			desc: shareDesc,
			link: pageHref,
			imgUrl: shareImg,
			success: function () {
			},
			cancel: function () {
			}
		});
		wx.onMenuShareQQ({
			title: shareTitle,
			desc: shareDesc,
			link: pageHref,
			imgUrl: shareImg,
			success: function () {
			},
			cancel: function () {
			}
		});
	});
}

function loadAudio(){
	$('.audio').each(function(){
		$(this)[0].load();
	})
}
function playAudio(string){
	$(string)[0].play();
}
function audioOff(string){
	$(string)[0].pause();
}
var manifest = ["images/logo.png"];
$("img").each(function(){
	manifest.push($(this).attr('src'));
});
var loadingMod = function(){
	this.html = $('<div class="loading" id="loading"><div class="loading_bar" id="loading_bar"></div><div class="loading_inner"></div></div>');
};
loadingMod.prototype = {
	show: function(){
		this.html.appendTo('body');
	},
	hide: function(){
		this.html.remove();
		window.pageInit();
	}
};
var loading_mod = new loadingMod();
var handleProgress = function(e) {
	loading_mod.show();
	var p = Math.round(e.progress * 100);
	$('.loading_page>li').each(function(index,item){
		if(p<(index+1)*25){
			$(item).show().siblings().hide();
			return false;
		};
	});
	$('.loading_bar').width(p+'%');
} //加载时回调
var handleComplete = function(e) {
	$('.loading_bar').width('100%');
	loading_mod.hide();
} //加载完毕回调
if(manifest.length>0){
	var preload = new createjs.LoadQueue(false);
	preload.on("progress", handleProgress, this);
	preload.on("complete", handleComplete, this);
	preload.loadManifest(manifest);
}else{
	handleComplete();
};

var lightFlash = function(itm,ind){
	setTimeout(function(){
		if(ind>=$(itm).find('.light').length){
			ind=0;
			setTimeout(function(){
				$(itm).find('.light').removeClass("fadeIn animated");
				lightFlash(itm,ind)
			},100)
		}else{
			$(itm).find('.light').eq(ind).addClass("fadeIn animated");
			ind++;
			lightFlash(itm,ind)
		}
	},500);
}
$('.lights').each(function(index,item){
	lightFlash(item,0);
})
function aniFunc(page) {
	$(page).addClass('show').find('.animate').each(function() {
		$(this).show().addClass($(this).attr('data-animate') + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass($(this).attr('data-animate') + ' animated');
		});
	});
}
$(function(){
	var pi = 0,
		myPageSwiper;

	if($.QueryString('page')){
		pi = Number($.QueryString('page'));
		pi = pi > $('.page-container .swiper-slide').length ? $('.page-container .swiper-slide').length-1 : pi -1;
	};

	window.pageInit = function(){
		aniFunc($('.page').eq(pi));
		$('.page-container').show();
		myPageSwiper = new Swiper('.swiper-main', {
			initialSlide: pi,
			loop: true,
			noSwiping: true,
			noSwipingClass : 'stop-swiping',
			slidesPerView: 1,
			loop: false,
			direction: 'vertical',
			autoHeight: true,
			onInit: function(e){
				if(pi == (e.slides.length-1)){
					$('.slide_btn').hide();
				}else{
					$('.slide_btn').show();
				};
			},
			onSlideChangeStart: function(e) {
				$('.page').find('.animate').hide();
				if(e.activeIndex === 2){
					//works_vote.setWorksList();
				}
				if(e.activeIndex === 3){
					works_vote.setLeaderBoard();
				}
				if(e.activeIndex === 4){
					works_vote.setWorksNode();
				}
				if(e.activeIndex === 5){
					works_vote.setVote();
				}
			},
			onSlideChangeEnd: function(e) {
				$('.row-rule').hide().prev('.row').find('.slide_btn').show();
				if(e.activeIndex == (e.slides.length-1)){
					$('.slide_btn').hide();
				}else{
					$('.slide_btn').show();
				};
				var curPage = e.activeIndex;
				aniFunc($('.page').eq(curPage));
				if(e.activeIndex === 0){
					e.unlockSwipeToNext();
				}else{
					e.lockSwipeToNext();
				}
				if(e.activeIndex === 2 || e.activeIndex === 3 || e.activeIndex === 4 || e.activeIndex === 5 || e.activeIndex === 6){
					setTimeout(function(){
						playAudio('#impact');
					},1000)
					playAudio('#gear');
				}
				
				if(e.activeIndex === 2){
					works_vote.listAjax.complete(function(){
						$('.works-wrap .scroll-container').each(function(){
							new Swiper(this,{
								scrollbar: $(this).find('.swiper-scrollbar'),
								scrollbarHide: false,
								direction: 'vertical',
								slidesPerView: 'auto',
								mousewheelControl: true,
								freeMode: true
							});
						});
					});
				}
				if(e.activeIndex === 3){
					works_vote.boardAjax.complete(function(){
						$('.leader-board-wrap .scroll-container').each(function(){
							new Swiper(this,{
								scrollbar: $(this).find('.swiper-scrollbar'),
								scrollbarHide: false,
								direction: 'vertical',
								slidesPerView: 'auto',
								mousewheelControl: true,
								freeMode: true
							});
						});
					});
				}
			},
			onSlidePrevEnd: function(swiper, event) {
				
			},
			onSlideNextEnd: function(e) {
			},
			onTouchEnd: function(swiper, event) {
				if(swiper.touches.diff<0 && swiper.activeIndex == 1){
					$('.row-rule').show().prev('.row').find('.slide_btn').hide();
				}
			}
		});
		
	};

	window.addEventListener('touchstart', touchstartHandler);
	function touchstartHandler(){
		if(!($('.audio').hasClass('loaded'))){
			$('.audio').addClass('loaded');
			loadAudio();
			if(voiceStatus){
				playAudio('#bgm');
			}
		}

	}
	$('.rule-btn').on('click',function(){
		$('.masker').fadeIn();
		$('.rule-wrap').fadeIn();
	});
	$('.masker,.btn-close').on('click',function(){
		$('.masker').fadeOut();
		$('.rules').fadeOut();
	});
	$('.btn-back').on('click',function(){
		$('.row-rule').hide().prev('.row').find('.slide_btn').show();;
	});
	$('.btn-confirm').on('click',function(){
		myPageSwiper.unlockSwipeToNext();
		myPageSwiper.slideNext();
	});
	$('.type-btn').on('click',function(){
		myPageSwiper.unlockSwipeToNext();
		myPageSwiper.slideNext();
		playAudio('#button');
	});
	$('.sound-btn').on('click',function(){
		playAudio('#button');
	});
	$('.rank-btn').on('click',function(){
		myPageSwiper.unlockSwipeToNext();
		myPageSwiper.slideNext();
	});
	$('.leader-board li').on('click',function(){
		myPageSwiper.unlockSwipeToNext();
		myPageSwiper.slideTo(4);
	});
	$('.btn-back-list').on('click',function(){
		myPageSwiper.unlockSwipeToNext();
		myPageSwiper.slideTo(2);
	});
	$('.share-btn').on('click',function(){
		$('.share-cover').show();
	});
	$('.share-cover').on('click',function(){
		$('.share-cover').hide();
	});

	$('#return').on('click',function(){
		myPageSwiper.swipeTo(0);
	});

	$('#btn-voice').on('touchstart',function(){
		var status = $(this).hasClass('off') ? false : true;
		if(status){
			$(this).addClass('off');
			voiceStatus = false;
			audioOff('#bgm');
		}else{
			$(this).removeClass('off');
			voiceStatus = true;
			playAudio('#bgm');
		}
	});


	var pop = {
		wrap: $('<div class="pop-alert"></div>'),
		show: function(html){
			var self = this;
			this.wrap.show().html(html);
			this.wrap.on('click',function(){
				self.hide();
			})
		},
		alert: function(text){
			this.wrap.show().delay(1000).fadeOut(10,function(){
				$(this).empty();
			}).html('<div class="text">'+text+'</div>');
		},
		hide: function(){
			this.wrap.hide().empty();
		}
	}
	pop.wrap.appendTo('body');
	/* data */

	function worksVote(list){
		this.list = list ? list : window.worksList;
		this.submitBtn = $('.btn-submit');
		this.listWraps = $('.works-wrap .works-list');
		this.boardWrap = $('.leader-board');
		this.checkedNum = 0;
		this.activeNode;
		this.selectNode = [];
		this.setWorksList();
	};
	worksVote.prototype = {
		getSmsCode: function(){
			var self = this;
			var mobileNumber = $.trim($('#mobile').val());
			var smsNumber = $.trim($('#sms').val());
			if($.testMobile(mobileNumber)){
				$.ajax({
					url: ajaxUrl,
					type: "post",
					data: {type: smsType,mobile:mobileNumber},
					dataType: "json",
					error: function(request){
						console.log(request);
					},
					success: function(data){
						if(data.status === 1){
							self.mobileNumber = mobileNumber;
							self.smsCode = data.code;
							pop.alert('提交成功，请查看手机短信');
						}else if(data.status === 2){
							pop.alert('短信已发送，请60秒后再试');
						}else{
							pop.alert('提交失败');
						}
					}
				});
			}else{
				pop.alert('请输入正确的手机号码');
				return false;
			}
		},
		submitVote: function(){
			var self = this;
			var mobileNumber = $.trim($('#mobile').val());
			var smsNumber = $.trim($('#sms').val());
			var worksID = '';
			self.listWraps.find('li.checked').each(function(index,item){
				if(index===0){
					worksID = worksID + $(item).data('id');
				}else{
					worksID = worksID + '|'+ $(item).data('id');
				}
			});
			if($.testMobile(mobileNumber) && $.testsmsNumber(smsNumber)){
				$.ajax({
					url: ajaxUrl,
					type: "post",
					data: {type: submitType,mobile:mobileNumber,openid:$.QueryString('openid'),worksID:worksID,smsCode:smsNumber},
					dataType: "json",
					error: function(request){
						console.log(request);
					},
					success: function(data){
						if(data.status === 1){
							pop.alert('投票成功');
							$('.ss_code').text(data.usercode);
							myPageSwiper.unlockSwipeToNext();
							myPageSwiper.slideTo(6);
						}else if(data.status === 2){
							pop.alert('手机号当天已参与过活动了');
						}else{
							pop.alert('投票失败');
						}
					}
				});
			}else{
				pop.alert('请填写手机号码和验证码');
			}
		},
		setLeaderBoard: function(){
			var self = this;
			this.boardAjax = $.ajax({
				url: ajaxUrl,
				type: "post",
				data: {type: boardType},
				dataType: "json",
				error: function(request){
					console.log(request);
				},
				success: function(data){
					if(data.status === 1){
						var list_data = data.data;
						self.boardWrap.empty();
						$(list_data).each(function(index,item){
							var list_node = _.find(self.list, function(node){ return node.name == item.Name; });
							var li = $('<li><div class="item rank">'+item.rowno+'</div><div class="item item-right"><div class="img-wrap"><div class="img-cover"></div><div class="img"><img src='+list_node.img+' /></div></div><div class="text"><div class="name">名称: '+item.Name+'</div><div class="dis">加油量: '+item.vote+'ml</div></div></div></li>');
							li.on('click',function(){
								self.activeNode = list_node;
								console.log(self.activeNode)
								myPageSwiper.unlockSwipeToNext();
								myPageSwiper.slideTo(4);
								event.stopPropagation();
							});
							if(index === 0){
								self.activeNode = list_node;
							}
							li.appendTo(self.boardWrap);
						});
					}else{
						console.log(data)
					}
				}
			});
		},
		setWorksList: function(){
			var self = this;
			this.checkedNum = 0;
			self.listWraps.empty();
			this.listAjax = $.ajax({
				url: ajaxUrl,
				type: "post",
				data: {type: oilType},
				dataType: "json",
				error: function(request){
					console.log(request);
				},
				success: function(data){
					if(data.status === 1){
						var oilArr = data.data;
						var ind = 0;
						$(self.list).each(function(index,item){
							item.vote = _.find(oilArr, function(node){ return Number(node.id) == item.id; }).vote;
							var li = $('<li data-id="'+item.id+'" data-name="'+item.name+'"><div class="checkbox"><div class="icon"></div></div><div class="number">编号:'+(index+1)+'</div><div class="img-wrap"><div class="img-cover"></div><div class="img"><img src="'+item.img+'" /></div></div><div class="name">名称: '+item.name+'</div><div class="dis">加油量: '+item.vote+'ml</div></li>');
							li.on('click',function(event){
								self.activeNode = item;
								console.log(self.activeNode)
								myPageSwiper.unlockSwipeToNext();
								myPageSwiper.slideTo(4);
								event.stopPropagation();
							});
							if(index===0){
								self.activeNode = item;
							}
							li.find('.checkbox').on('click',function(event){
								if(li.hasClass('checked')){
									li.removeClass('checked');
									self.checkedNum--;
								}else{
									if(self.checkedNum<3){
										li.addClass('checked');
										self.checkedNum++;
									}
								}
								event.stopPropagation();
							});
							li.appendTo(self.listWraps.eq(ind++%2));
							
						});
						self.setWorksNode();
					}
				}
			});
			self.submitBtn.off('click').on('click',function(){
				self.checkedNum = self.listWraps.find('li.checked').length;
				if(self.checkedNum === 3){
					myPageSwiper.unlockSwipeToNext();
					myPageSwiper.slideTo(5);
				}else{
					pop.alert('请选择3个队伍投票');
				}
			});
		},
		setWorksNode: function(){
			var self = this;
			var node = self.activeNode ;
			$('.works-node .node-img').attr('src',node.img);
			$('.works-node .node-id').text(node.id);
			$('.works-node .node-dis').text(node.des);
			$('.works-node .node-vote').text(node.vote);
			$('.works-node .pd-img').off('click').on('click',function(event){
				pop.show($('<div class="img-wrap"><img src="'+node.img+'" /></div>'));
				event.stopPropagation();
			})
			$('.btn-back-choose').off('click').on('click',function(event){
				myPageSwiper.unlockSwipeToNext();
				if(myPageSwiper.previousIndex===3){
					myPageSwiper.slideTo(3);
				}else{
					myPageSwiper.slideTo(2);
				}
				event.stopPropagation();
			});
			$('.btn-start-vote').off('click').on('click',function(event){
				if(self.checkedNum<3){
					self.listWraps.find('li:[data-name="'+node.name+'"]').addClass('checked');
					self.checkedNum++;
					myPageSwiper.unlockSwipeToNext();
					myPageSwiper.slideTo(2);
				}else{
					pop.alert('您的选择队伍已满3个');
				}
				event.stopPropagation();
			});
		},
		setVote: function(){
			var self = this;
			$('.pd-list-3').html(self.listWraps.find('li.checked').clone());
			$('.btn_getsms').off('click').on('click',function(){
				self.getSmsCode();
			});
			$('.btn-start-shake').off('click').on('click',function(){
				self.submitVote();
			});
		}
	}
	var works_vote = new worksVote(window.worksList);
});
