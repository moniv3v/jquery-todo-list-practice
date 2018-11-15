$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        function addToDo() {
            var input = $('#input').val();
            $('ol').append(`<li id=` + generateUUID() + ` class=""><input name="done-todo" type="checkbox" class="done-todo"><span>` + input + `</span></li>`);
            $('#input').val("");
        }

        // code to be implemented
        $("#button").click(addToDo);

        $('input').focus(function () {
            $(this).val('');
        });

        $("#input").keyup(function (e) {
            if (e.keyCode == 13) {
                addToDo();
            }
        });

        $(document).on("change", ":checkbox", function () {
            if ($(this).is(':checked')) {
                $(this).parent().addClass('checked');
            } else {
                $(this).parent().removeClass('checked');
            }
        });

        //all
        $(document).on("click","a[data-filter='all']",function() {
            $("#filters li a").removeClass('selected');
            $(this).addClass('selected');
            $(".done-todo").each(function () {
                $(this).parent().show();
            })
        })

         //"active"
        $(document).on("click","a[data-filter='active']",function() {
            $("#filters li a").removeClass('selected');
            $(this).addClass('selected');
            $("input[name='done-todo']").each(function (){
                if($(this).is(":checked")){
                  $(this).parent().hide();
                }else{
                  $(this).parent().show();
                }
            })
        })

         //"complete"
        $(document).on("click","a[data-filter='complete']",function() {
            $("#filters li a").removeClass('selected');
                    $(this).addClass('selected');
            $("input[name='done-todo']").each(function (){
                if($(this).is(":checked")){
                    $(this).parent().show();
                }else{
                  $(this).parent().hide();
                }
            })
        })

        $(document).on("dblclick","li",function(){
            $(this)
            .children('span').attr('contentEditable',true)
            .keypress(function(e){
                if(e.keyCode==13){
                    e.target.blur();
                    $(this)
                    .children('span').attr('contentEditable',false);
                }
            })
        })
    });