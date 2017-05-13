var rcl_public_form = {
    required: new Array()
};

jQuery(document).ready(function($) {
    
    $('.rcl-public-form #insert-media-button').click(function(e) {
        
        var editor = $(this).data('editor');
        
        wp.media.featuredImage.set = function(thumbnail_id){
            
            rcl_get_post_thumbnail_html(thumbnail_id);
    
        };

        wp.media.editor.open(editor);
        
        return false;
        
    });

    $.fn.extend({
        insertAtCaret: function(myValue){
            return this.each(function(i) {
                if (document.selection) {
                    // Для браузеров типа Internet Explorer
                    this.focus();
                    var sel = document.selection.createRange();
                    sel.text = myValue;
                    this.focus();
                }
                else if (this.selectionStart || this.selectionStart == '0') {
                    // Для браузеров типа Firefox и других Webkit-ов
                    var startPos = this.selectionStart;
                    var endPos = this.selectionEnd;
                    var scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
                    this.focus();
                    this.selectionStart = startPos + myValue.length;
                    this.selectionEnd = startPos + myValue.length;
                    this.scrollTop = scrollTop;
                } else {
                    this.value += myValue;
                    this.focus();
                }
            })
        }
    });

    jQuery('#rcl-delete-post .delete-toggle').click(function() {
        jQuery(this).next().toggle('fast');
        return false;
    });

    jQuery('form[name="public_post"] input[name="edit-post-rcl"],form[name="public_post"] input[name="add_new_task"]').click(function(){
        var error=0;
        jQuery('form[name="public_post"]').find(':input').each(function() {
            for(var i=0;i<field.length;i++){
                if(jQuery(this).attr('name')==field[i]){
                    if(jQuery(this).val()==''){
                            jQuery(this).attr('style','border:1px solid red !important');
                            error=1;
                    }else{
                            jQuery(this).attr('style','border:1px solid #E6E6E6 !important');
                    }
                }
            }
        });
        if(error==0) return true;
        else return false;
    });

});

rcl_add_action('rcl_init','rcl_init_click_post_thumbnail');
function rcl_init_click_post_thumbnail(){
    jQuery(".rcl-public-form").on('click','.thumb-foto',function(){		
        jQuery(".rcl-public-form .thumb-foto").removeAttr("checked");
        jQuery(this).attr("checked",'checked');			
    });
}

function rcl_get_post_thumbnail_html(thumbnail_id){
    
    rcl_preloader_show(jQuery('.rcl-public-form'));
            
    var dataString = 'action=rcl_get_post_thumbnail_html&thumbnail_id='+thumbnail_id;
    dataString += '&ajax_nonce='+Rcl.nonce;
    jQuery.ajax({
        type: 'POST', data: dataString, dataType: 'json', url: Rcl.ajaxurl,
        success: function(result){

            rcl_preloader_hide();

            if(result['error']){
                rcl_notice(result['error'],'error',10000);
                return false;
            }

            jQuery('#rcl-thumbnail-post .thumbnail-image').html(result['thumbnail_image']);
            jQuery('#rcl-thumbnail-post .thumbnail-id').val(thumbnail_id);
        }
    });
    
}

function rcl_remove_post_thumbnail(){
    jQuery('#rcl-thumbnail-post .thumbnail-image').empty();
    jQuery('#rcl-thumbnail-post .thumbnail-id').val('0');
}

function rcl_delete_post(element){
    
    rcl_preloader_show(jQuery(element).parents('li'));
    
    var post_id = jQuery(element).data('post');
    var post_type = jQuery(element).parents('form').data('post_type');
    var dataString = 'action=rcl_ajax_delete_post&post_id='+post_id;
    dataString += '&ajax_nonce='+Rcl.nonce;
    jQuery.ajax({
        type: 'POST', data: dataString, dataType: 'json', url: Rcl.ajaxurl,
        success: function(data){
            rcl_preloader_hide();
            if(data['error']){
                rcl_notice(data['error'],'error',10000);
                return false;
            }

            jQuery('#'+data['post_type']+'-'+post_id).remove();
            
            data.post_id = post_id;
            
            rcl_do_action('rcl_delete_post',data);
            
            rcl_notice(data['success'],'success',10000);
        }
    });
    return false;
}

rcl_add_action('rcl_delete_post','rcl_delete_thumbnail_attachment');
function rcl_delete_thumbnail_attachment(data){
    
    if(data['post_type'] != 'attachment') return false;
    
    if(jQuery('#rcl-thumbnail-post').size()){
        
        var currentThumbId = jQuery('#rcl-thumbnail-post .thumbnail-id').val();
        
        if(currentThumbId == data['post_id'])
            rcl_remove_post_thumbnail();
    }
    
}

function rcl_edit_post(element){	

    var post_id = jQuery(element).data('post');
    
    rcl_preloader_show(jQuery('#lk-content'));
    
    var dataString = 'action=rcl_get_edit_postdata&post_id='+post_id;
    dataString += '&ajax_nonce='+Rcl.nonce;
    jQuery.ajax({
            type: 'POST', data: dataString, dataType: 'json', url: Rcl.ajaxurl,
            success: function(data){ 
                
                rcl_preloader_hide();
                
                if(data['error']){
                    rcl_notice(data['error'],'error',10000);
                    return false;
                }                                   
                if(data['result']==100){
                    
                    ssi_modal.show({
                        title: Rcl.local.edit_box_title,
                        className: 'rcl-edit-post-form',
                        sizeClass: 'small',
                        buttons: [{
                            label: Rcl.local.save,
                            closeAfter: false,
                            method: function () {
                                rcl_preloader_show('#rcl-popup-content form');
                                var postdata   = jQuery('#rcl-popup-content form').serialize();
                                var dataString = 'action=rcl_edit_postdata&'+postdata;
                                dataString += '&ajax_nonce='+Rcl.nonce;
                                jQuery.ajax({
                                    type: 'POST', data: dataString, dataType: 'json', url: Rcl.ajaxurl,
                                    success: function(data){
                                        if(data['error']){
                                            rcl_notice(data['error'],'warning',10000);
                                        }  
                                        if(data['result']==100){
                                            rcl_notice(data['content'],'success',10000);
                                            ssi_modal.close();
                                        }
                                        rcl_preloader_hide();
                                    }
                                });
                            }
                        }, {
                            label: Rcl.local.close,
                            closeAfter: true
                        }],
                        content: '<div id="rcl-popup-content">'+data['content']+'</div>'
                    });

                }
            }
    });
}

function rcl_preview(e){

    var submit = jQuery(e);
    var formblock = submit.parents('form');
    var post_type = formblock.data('post_type');

    if(!rcl_check_required_fields(formblock)) return false;
    
    rcl_preloader_show(formblock);

    var iframe = jQuery("#contentarea-"+post_type+"_ifr").contents().find("#tinymce").html();
    if(iframe){
        tinyMCE.triggerSave();
        formblock.find('textarea[name="post_content"]').html(iframe);
    }
    
    var button_draft = formblock.find('input[name="button-draft"]').val();
    var button_delete = formblock.find('input[name="button-delete"]').val();
    var button_preview = formblock.find('input[name="button-preview"]').val();

    var string   = formblock.serialize();

    var dataString = 'action=rcl_preview_post&'+string;
    dataString += '&ajax_nonce='+Rcl.nonce;
    jQuery.ajax({
        type: 'POST', 
        data: dataString, 
        dataType: 'json', 
        url: Rcl.ajaxurl,
        success: function(data){
            
            rcl_preloader_hide();

            if(data['error']){
                rcl_notice(data['error'],'error',10000);
                submit.attr('disabled',false).val(Rcl.local.preview);
                return false;
            }

            if(data['content']){
                
                var buttons = [];
                
                buttons[0] = {
                        className: 'btn btn-primary',
                        label: Rcl.local.edit,
                        closeAfter: true,
                        method: function () {
                            submit.attr('disabled',false).val(Rcl.local.preview);
                        }
                    };
                    
                if(button_draft){
                    buttons[1] = {
                        className: 'btn btn-danger',
                        label: Rcl.local.save_draft,
                        closeAfter: false,
                        method: function () {
                            rcl_save_draft();
                        }
                    };
                }
                
                var i = buttons.length;
                buttons[i] = {
                        className: 'btn btn-danger',
                        label: Rcl.local.publish,
                        closeAfter: false,
                        method: function () {
                            jQuery('form.rcl-public-form').submit();
                        }
                    };

                ssi_modal.show({
                    sizeClass: 'small',
                    title: Rcl.local.preview,
                    className: 'rcl-preview-post',
                    buttons: buttons,
                    content: '<div id="rcl-preview">'+data['content']+'</div>'
                });

                return true;
            }

            rcl_notice(Rcl.local.error,'error',10000);

        }
    }); 
    return false;

}

function rcl_save_draft(e){
    
    if(!e) e = jQuery('#rcl-draft-post');
    
    if(!rcl_check_publish(e)) return false;
    
    jQuery(e).after('<input type="hidden" name="save-as-draft" value=1>');

    jQuery('form.rcl-public-form').submit();
}

function rcl_check_publish(e){
    
    var submit = jQuery(e);
    var formblock = submit.parents('form');
    
    if(!rcl_check_required_fields(formblock)) return false;
    
    return true; 
}

function rcl_publish(e){
    
    var submit = jQuery(e);
    var formblock = submit.parents('form');
    var post_type = formblock.data('post_type');

    if(!rcl_check_required_fields(formblock)) return false;
    
    rcl_preloader_show(formblock);

    var iframe = jQuery("#contentarea-"+post_type+"_ifr").contents().find("#tinymce").html();
    if(iframe){
        tinyMCE.triggerSave();
        formblock.find('textarea[name="post_content"]').html(iframe);
    }

    var string   = formblock.serialize();

    var dataString = 'action=rcl_preview_post&'+string;
    dataString += '&ajax_nonce='+Rcl.nonce;
    jQuery.ajax({
        type: 'POST', 
        data: dataString, 
        dataType: 'json', 
        url: Rcl.ajaxurl,
        success: function(data){

            if(data['error']){
                
                rcl_preloader_hide();
                
                rcl_notice(data['error'],'error',10000);
                
                return false;
            }
            
            jQuery('form.rcl-public-form').submit();
            
        }
    }); 
    
}

function rcl_check_required_fields(form){

    var required = true;
    
    jQuery('form.rcl-public-form').find(':required').each(function(){
        var i = rcl_public_form.required.length;
        rcl_public_form.required[i] = jQuery(this).attr('name');
    });

    var requireds = rcl_public_form.required;

    requireds.forEach(function(namefield, i, requireds) {

        var field = form.find('[name="'+namefield+'"]');
        var type = field.attr('type');
        var value = false;

        if(type=='checkbox'){
            if(field.is(":checked")){
                value = true;
                field.next('label').css('box-shadow','none');
            }else {
                field.next('label').css('box-shadow','red 0px 0px 5px 1px inset');
            }
        }else{
            if(field.val()) value = true;
        }

        if(!value){
            field.css('box-shadow','red 0px 0px 5px 1px inset');
            required = false;
        }else{
            field.css('box-shadow','none');
        }

    });
    
    if(form.find( 'input[name="cats[]"]' ).length > 0){             
        if(form.find('input[name="cats[]"]:checked').length == 0){
            form.find( 'input[name="cats[]"]' ).css('box-shadow','0px 0px 1px 1px red');
            required = false;
        }else{
            form.find( 'input[name="cats[]"]' ).css('box-shadow','none');
        }
    }

    if(!required){
        rcl_notice(Rcl.local.requared_fields_empty,'error',10000);
        return false;
    }
    
    return true;
    
}

function rcl_get_prefiew_content(formblock,iframe){
    formblock.find('textarea[name="post_content"]').html(iframe);
    return formblock.serialize();
}

function rcl_preview_close(e){
    ssi_modal.close();	
}

function rcl_init_public_form(post){
    
    var post_id = post.post_id;
    var post_type = post.post_type;
    var ext_types = post.ext_types;
    var size_files = post.size_files;
    var max_files = post.max_files;
    var post_status = 'new';
    
    if(post.post_status)
        post_status = post.post_status;
    
    jQuery('form.rcl-public-form').find(':required').each(function(){
        var i = rcl_public_form.required.length;
        rcl_public_form.required[i] = jQuery(this).attr('name');
    });

    var maxsize = size_files*1024*1024;

    rcl_add_dropzone('#rcl-public-dropzone-'+post_type);
    
    jQuery('#upload-public-form-'+post_type).fileupload({
        dataType: 'json',
        type: 'POST',
        dropZone: jQuery('#rcl-public-dropzone-'+post_type),
        url: Rcl.ajaxurl,
        formData:{
            action: 'rcl_imagepost_upload',
            post_type: post_type,
            post_id: post_id,
            ext_types: ext_types,
            size_files: size_files,
            max_files: max_files,
            ajax_nonce: Rcl.nonce
        },
        singleFileUploads:false,
        autoUpload:true,
        send:function (e, data) {
            var error = false;
            rcl_preloader_show('form.rcl-public-form');                   
            var cnt_now = jQuery('#temp-files-'+post_type+' li').length;                    
            jQuery.each(data.files, function (index, file) {
                cnt_now++;
                if(cnt_now>max_files){
                    rcl_notice(Rcl.local.allowed_downloads+' '+max_files,'error',10000);
                    error = true;
                }                       
                if(file['size']>maxsize){
                    rcl_notice(Rcl.local.upload_size_public+' '+size_files+' MB','error',10000);                            
                    error = true;
                }                       
            });
            if(error){
                rcl_preloader_hide();
                return false;
            }
        },
        done: function (e, data) {
            jQuery.each(data.result, function (index, file) {
                if(data.result['error']){
                    rcl_notice(data.result['error'],'error',10000);
                    rcl_preloader_hide();
                    return false;
                }

                if(file['string']){
                    jQuery('#temp-files-'+post_type).append(file['string']);
                }
            });
            rcl_preloader_hide();
        }
    });
}

function rcl_init_thumbnail_uploader(e,options){
    
    var form = jQuery(e).parents('form');
    
    var post_id = form.data('post_id');
    var post_type = form.data('post_type');
    var ext_types = 'jpg,png,jpeg';
    var maxsize_mb = options.size;

    var maxsize = maxsize_mb*1024*1024;
    
    jQuery('#rcl-thumbnail-uploader').fileupload({
        dataType: 'json',
        type: 'POST',
        url: Rcl.ajaxurl,
        formData:{
            action: 'rcl_imagepost_upload',
            post_type: post_type,
            post_id: post_id,
            ext_types: ext_types,
            ajax_nonce: Rcl.nonce
        },
        singleFileUploads:true,
        autoUpload:true,
        send:function (e, data) {
            
            var error = false;
            
            rcl_preloader_show('form.rcl-public-form');                   
                  
            jQuery.each(data.files, function (index, file) {
                      
                if(file['size']>maxsize){
                    rcl_notice(Rcl.local.upload_size_public+' '+maxsize_mb+' MB','error',10000);                            
                    error = true;
                } 
                
            });
            
            if(error){
                rcl_preloader_hide();
                return false;
            }
            
        },
        done: function (e, data) {
            jQuery.each(data.result, function (index, file) {
                
                rcl_preloader_hide();
                
                if(data.result['error']){
                    rcl_notice(data.result['error'],'error',10000);
                    return false;
                }

                if(file['string']){
                    jQuery('#temp-files-'+post_type).append(file['string']);

                    jQuery('#rcl-thumbnail-post .thumbnail-image').html(file['thumbnail_image']);
                    jQuery('#rcl-thumbnail-post .thumbnail-id').val(file['attachment_id']);
                }
            });
            
            
        }
    });
    
}

function rcl_add_image_in_form(e,content){
    
    var post_type = jQuery(e).parents("form").data("post_type");           

    jQuery("#contentarea-" + post_type).insertAtCaret(content + "&nbsp;");
    
    tinyMCE.execCommand("mceInsertRawHTML", false, content);
    
    return false;
}