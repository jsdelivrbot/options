import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const flyIn = trigger('flyIn', [
  state('in', style({transform: 'translateX(0)'})),
  transition('void => *', [
       animate(600, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 0.5, transform: 'translateX(25px)',  offset: 0.2}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
  ]),
  transition('* => void', [
        animate(600, keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 0.5, transform: 'translateX(-25px)', offset: 0.8}),
        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
      ]))
  ])
]);
export const modalMock = trigger('modalMock', [
  state('in', style({transform: 'translateX(0)'})),
  transition('void => *', [
       animate(300, keyframes([
        style({opacity: 0}),
        style({opacity: 0.5}),
        style({opacity: 1})
      ]))
  ]),
  transition('* => void', [
        animate(300, keyframes([
        style({opacity: 1}),
        style({opacity: 0.5}),
        style({opacity: 0})
      ]))
  ])
]);
export const fade = trigger('fade', [
  transition('void => *', [
       animate(500, keyframes([
        style({opacity:0.2,transform: 'rotateX(-120deg)'}),
        style({opacity:0.4,transform: 'rotateX(-60deg)'}),
        style({opacity:0.6,transform: 'rotateX(-30deg)'}),
        style({opacity:0.8,transform: 'rotateX(-15deg)'}),
        style({opacity:1,transform: 'rotateX(0deg)'}),
        style({opacity:0.6,transform: 'rotateX(30deg)'}),
        style({opacity:0.2,transform: 'rotateX(60deg)'}),
        style({opacity:0.6,transform: 'rotateX(30deg)'}),
        style({opacity:1,transform: 'rotateX(0deg)'}),
      ]))
  ]),
  transition('* => void', [
        animate(500, keyframes([
          style({opacity:1,transform: 'rotateX(0deg)'}),
          style({opacity:0.6,transform: 'rotateX(30deg)'}),
          style({opacity:0.2,transform: 'rotateX(60deg)'}),
          style({opacity:0.6,transform: 'rotateX(30deg)'}),
          style({opacity:1,transform: 'rotateX(0deg)'}),
          style({opacity:0.8,transform: 'rotateX(-15deg)'}),
          style({opacity:0.6,transform: 'rotateX(-30deg)'}),
          style({opacity:0.4,transform: 'rotateX(-60deg)'}),
          style({opacity:0.2,transform: 'rotateX(-120deg)'}),
      ]))
  ])
]);
export const flyTop = trigger('flyTop', [
	transition('void => *', [
		 animate(1000, keyframes([
		  style({transform: 'translate3d(0px, 30px, 0px)'}),
		  style({transform: 'translate3d(0px, 20px, 0px)'}),
		  style({transform: 'translate3d(0px, 10px, 0px)'}),
		  style({transform: 'translate3d(0px, 0px, 0px)'}),
		]))
	]),
	transition('* => void', [
		  animate(1000, keyframes([
			style({transform: 'translate3d(0px, 0px, 0px)'}),
			style({transform: 'translate3d(0px, -10px, 0px)'}),
			style({transform: 'translate3d(0px, -20px, 0px)'}),
			style({transform: 'translate3d(0px, -30px, 0px)'}),
		]))
	])
  ]);