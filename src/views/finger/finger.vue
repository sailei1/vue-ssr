<template>
    <div>
        <p> finger</p>
        <div  v-finger:tap="tap"
              v-finger:multipoint-start="multipointStart"
              v-finger:swipe="swipe"
              v-finger:pinch="pinch"
              v-finger:rotate="rotate"
              v-finger:press-move="pressMove.bind(this, 12)"
              v-finger:multipoint-end="multipointEnd"
              v-finger:double-tap="doubleTap"
              v-finger:single-tap="singleTap"

              v-finger:touch-start="touchStart"
              v-finger:touch-move="touchMove"
              v-finger:touch-end="touchEnd"
              v-finger:touch-cancel="touchCancel"
        >
            <div style="margin-bottom:50px;">the element that you want to bind event</div>
            <div style="margin-bottom:50px;" v-finger:long-tap="longTap">this is longTap test demo</div>
            <div style="margin-bottom:50px;" v-finger:tap.stopPropagation="stopTap">this is the stopPropagation demo</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
   import finger from '../../util/finger_directive_help.js'

    export default {
        name: 'finger',
        directives: finger,
        components: {

        },
        methods:{
            tap: function(evt) { evt.preventDefault(); console.log('onTap'); },
            multipointStart: function() { console.log('onMultipointStart'); },
            longTap: function() { console.log('onLongTap'); },
            swipe: function(evt) {
                console.log("swipe" + evt.direction);
                console.log('onSwipe');
            },
            pinch: function(evt) {
                console.log(evt.scale);
                console.log('onPinch');
            },
            rotate: function(evt) {
                console.log(evt.angle);
                console.log('onRotate');
            },
            pressMove: function(num, evt) {
                console.log(evt.deltaX);
                console.log(evt.deltaY);
                console.log('onPressMove with params:' + num);
            },
            multipointEnd: function() { console.log('onMultipointEnd'); },
            doubleTap: function() { console.log('onDoubleTap'); },
            singleTap: function () { console.log('onSingleTap'); },
            touchStart: function() { console.log('onTouchStart'); },
            touchMove: function() { console.log('onTouchMove'); },
            touchEnd: function() { console.log('onTouchEnd'); },
            touchCancel: function() { console.log('onTouchCancel'); },
            stopTap: function () {console.log('stop tap');}

        }
    };
</script>
