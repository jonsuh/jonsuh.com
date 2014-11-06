// ADDITIONAL JQUERY VALIDATE METHODS
if ($("#mc-embedded-subscribe-form").length) { // Only run if MailChimp embedded form exists
  (function($) {
    // Validate a multifield birthday
    $.validator.addMethod("mc_birthday", function(date, element, grouping_class) {
      var isValid = false;
      var $fields = $('input:not(:hidden)' , $(element).closest(grouping_class));
      if ($fields.filter(':filled').length == 0 && this.optional(element)) {
        isValid = true; // None have been filled out, so no error 
      } else {
        var dateArray = new Array();
        dateArray['month'] = $fields.filter("input[name*='[month]']").val();
        dateArray['day'] = $fields.filter("input[name*='[day]']").val();
            
            // correct month value
            dateArray['month'] = dateArray['month'] - 1;

            var testDate = new Date(1970, dateArray['month'], dateArray['day']);
            if (testDate.getDate()!=dateArray['day'] || testDate.getMonth()!=dateArray['month']) {
                isValid = false;
            } else {
                isValid = true;
            }
      }
      return isValid;
    }, "Please enter a valid month and day.");
    // Validate a multifield date
    $.validator.addMethod("mc_date", function(date, element, grouping_class) {
      var isValid = false;
      var $fields = $('input:not(:hidden)' , $(element).closest(grouping_class));
      if ($fields.filter(':filled').length == 0 && this.optional(element)) {
        isValid = true; // None have been filled out, so no error 
      } else {
        var dateArray = new Array();
        dateArray['month'] = $fields.filter("input[name*='[month]']").val();
        dateArray['day'] = $fields.filter("input[name*='[day]']").val();
        dateArray['year'] = $fields.filter("input[name*='[year]']").val();
            
            // correct month value
            dateArray['month'] = dateArray['month'] - 1;

            // correct year value
            if (dateArray['year'].length < 4) {
                dateArray['year'] = (parseInt(dateArray['year']) < 50) ? 2000 + parseInt(dateArray['year']) : 1900 + parseInt(dateArray['year']);
            }

            var testDate = new Date(dateArray['year'], dateArray['month'], dateArray['day']);
            if (testDate.getDate()!=dateArray['day'] || testDate.getMonth()!=dateArray['month'] || testDate.getFullYear()!=dateArray['year']) {
                isValid = false;
            } else {
                isValid = true;
            }
      }
      return isValid;
    }, "Please enter a valid date");

    // Validate a multifield phone number
    $.validator.addMethod("mc_phone", function(phone_number, element, grouping_class) {
      var isValid = false;
      var $fields = $('input:filled:not(:hidden)' , $(element).closest(grouping_class));
      if ($fields.length == 0 && this.optional(element)) {
        isValid = true; // None have been filled out, so no error 
      } else {
        phone_number = $fields.eq(0).val() + $fields.eq(1).val() + $fields.eq(2).val();
        isValid = phone_number.length == 10 && phone_number.match(/[0-9]{9}/);
      }
      return isValid;
    }, "Please specify a valid phone number");

    $.validator.addMethod("skip_or_complete_group", function(value, element, grouping_class) {
      var $fields = $('input:not(:hidden)' , $(element).closest(grouping_class)),
        $fieldsFirst = $fields.eq(0),
        validator = $fieldsFirst.data("valid_skip") ? $fieldsFirst.data("valid_skip") : $.extend({}, this),
        numberFilled = $fields.filter(function() {
          return validator.elementValue(this);
        }).length,
        isValid = numberFilled === 0 || numberFilled === $fields.length;

      // Store the cloned validator for future validation
      $fieldsFirst.data("valid_skip", validator);

      // If element isn't being validated, run each field's validation rules
      if (!$(element).data("being_validated")) {
        $fields.data("being_validated", true);
        $fields.each(function() {
          validator.element(this);
        });
        $fields.data("being_validated", false);
      }
      return isValid;
    }, $.validator.format("Please supply missing fields."));

    $.validator.addMethod("skip_or_fill_minimum", function(value, element, options) {
      var $fields = $(options[1], element.form),
        $fieldsFirst = $fields.eq(0),
        validator = $fieldsFirst.data("valid_skip") ? $fieldsFirst.data("valid_skip") : $.extend({}, this),
        numberFilled = $fields.filter(function() {
          return validator.elementValue(this);
        }).length,
        isValid = numberFilled === 0 || numberFilled >= options[0];
      console.log($fields.eq(0));
      // Store the cloned validator for future validation
      $fieldsFirst.data("valid_skip", validator);

      // If element isn't being validated, run each skip_or_fill_minimum field's validation rules
      if (!$(element).data("being_validated")) {
        $fields.data("being_validated", true);
        $fields.each(function() {
          validator.element(this);
        });
        $fields.data("being_validated", false);
      }
      return isValid;
    }, $.validator.format("Please either skip these fields or fill at least {0} of them."));

    $.validator.addMethod("zipcodeUS", function(value, element) {
      return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value);
    }, "The specified US ZIP Code is invalid");

  }(jQuery));

  // MC
  (function($) {

    // TODO: Do we actually allow custom error styles or is this legacy code?
    var err_style = '';
    try {
        err_style = mc_custom_error_style;
    } catch(e){
        err_style = '#mc_embed_signup input.mce_inline_error { border-color:#6B0505; } #mc_embed_signup div.mce_inline_error { margin: 0 0 1em 0; padding: 5px 10px; background-color:#6B0505; font-weight: bold; z-index: 1; color:#fff; }';
    }
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = err_style;
    } else {
      style.appendChild(document.createTextNode(err_style));
    }
    head.appendChild(style);

    // Expose extra mc form methods in global var
    window.mc = {

      /**
         *  Open the evil popup   
       */
      openPopup: function() {
        $('#mc_embed_signup a.mc_embed_close').show();
          setTimeout( function(){ $('#mc_embed_signup').fadeIn(); } , mc.delayPopup);
      },
      /**
       *  Close the evil popup
       */
      closePopup: function() {
              $('#mc_embed_signup').hide();
              var now = new Date();
              var expires_date = new Date( now.getTime() + 31536000000 );
              document.cookie = 'MCEvilPopupClosed=yes;expires=' + expires_date.toGMTString()+';path=/';
          },
          /**
       *  Figure out if we should show the evil popup (if they've closed it before, don't show it.)
           */
          evalPopup: function() {
            $('#mc_embed_signup').hide();
          cks = document.cookie.split(';');
          for(i=0; i<cks.length; i++){
              parts = cks[i].split('=');
              if (parts[0].indexOf('MCEvilPopupClosed') != -1) mc.showPopup = false;
          }
          if (mc.showPopup) mc.openPopup();
          },
          /**
       *  Grab the list subscribe url from the form action and make it work for an ajax post.
           */
      getAjaxSubmitUrl: function() {
        var url = $("form#mc-embedded-subscribe-form").attr("action");
        url = url.replace("/post?u=", "/post-json?u=");
        url += "&c=?";
        return url;
      },
      /**
       *  Classify text inputs in the same field group as group for validation purposes.
       *  All this does is tell jQueryValidation to create one error div for the group, rather
       *  than one for each input. Primary use case is birthday and date fields, where we want 
       *  to display errors about the inputs collectively, not individually.
       *
       *  NOTE: Grouping inputs will give you one error div, but you still need to specify where
       *  that div should be displayed. By default, it's inserted after the first input with a
       *  validation error, which can break up a set of inputs. Use the errorPlacement setting in
       *  the validator to control error div placement.
       */
      getGroups: function (){ 
        var groups = {};
        $(".mc-field-group").each(function(index) {
          var inputs = $(this).find("input:text:not(:hidden)"); // TODO: What about non-text inputs like number?
          if (inputs.length > 1) {
            var mergeName = inputs.first().attr("name");
            var fieldNames = $.map(inputs, function(f) { return f.name; });
            groups[mergeName.substring(0, mergeName.indexOf("["))] = fieldNames.join(" ");
          }
        });
        return groups;
      },
      /**
       *  Chick if a field is part of a multipart field
       *  (e.g., A date merge field is composed of individual inputs for month, day and year)
       *  Used in jQuery validation onkeyup method to ensure that we don't evaluate a field
       *  if a user hasn't reached the last input in a multipart field yet.
       */
      isMultiPartField: function(element) {
        return ($('input:not(:hidden)' , $(element).closest(".mc-field-group")).length > 1);
      },
      /**
       *  Checks if the element is the last input in its fieldgroup. 
       *  If the field is not the last in a set of inputs we don't want to validate it on certain events (onfocusout, onblur)
       *  because the user might not be finished yet.
       */
      isTooEarly: function(element) {
        var fields = $('input:not(:hidden)' , $(element).closest(".mc-field-group"));
        return ($(fields).eq(-1).attr('id') != $(element).attr('id'));
      },
      /**
       *  Handle the error/success message after successful form submission.
       *  Success messages are appended to #mce-success-response
       *  Error messages are displayed with the invalid input when possible, or appended to #mce-error-response
       */
      mce_success_cb: function(resp){

          $('#mce-success-response').hide();
          $('#mce-error-response').hide();

          // On successful form submission, display a success message and reset the form
          if (resp.result == "success"){
              $('#mce-'+resp.result+'-response').show();
              $('#mce-'+resp.result+'-response').html(resp.msg);
              $('#mc-embedded-subscribe-form').each(function(){
                  this.reset();
            });

          // If the form has errors, display them, inline if possible, or appended to #mce-error-response
          } else {

          // Example errors - Note: You only get one back at a time even if you submit several that are bad. 
          // Error structure - number indicates the index of the merge field that was invalid, then details
          // Object {result: "error", msg: "6 - Please enter the date"} 
          // Object {result: "error", msg: "4 - Please enter a value"} 
          // Object {result: "error", msg: "9 - Please enter a complete address"} 

          // Try to parse the error into a field index and a message.
          // On failure, just put the dump thing into in the msg variable.
              var index = -1;
              var msg;
              try {
                  var parts = resp.msg.split(' - ',2);
                  if (parts[1]==undefined){
                      msg = resp.msg;
                  } else {
                      i = parseInt(parts[0]);
                      if (i.toString() == parts[0]){
                          index = parts[0];
                          msg = parts[1];
                      } else {
                          index = -1;
                          msg = resp.msg;
                      }
                  }
              } catch(e){
                  index = -1;
                  msg = resp.msg;
              }

              try {
                // If index is -1 if means we don't have data on specifically which field was invalid.
                // Just lump the error message into the generic response div.
                  if (index == -1){
                      $('#mce-'+resp.result+'-response').show();
                      $('#mce-'+resp.result+'-response').html(msg);      

                  } else {
                      var fieldName = $("input[name*='"+fnames[index]+"']").attr('name'); // Make sure this exists (they haven't deleted the fnames array lookup)
                      var data = {};
                      data[fieldName] = msg;
                      mc.mce_validator.showErrors(data);
                  }
              } catch(e){
                  $('#mce-'+resp.result+'-response').show();
                  $('#mce-'+resp.result+'-response').html(msg);
              }
          }
      }
    }

    window.mc.mce_validator = $("#mc-embedded-subscribe-form").validate({

      // Set error HTML: <div class="mce_inline_error"></div>
      errorClass: "mce_inline_error", 
        errorElement: "div", 
      
        // Validate fields on keyup, focusout and blur. 
      onkeyup: false,
      onfocusout: function(element) { 
        if (!mc.isTooEarly(element)) {
          $(element).valid();
        }
      },
      onblur: function(element) { 
        if (!mc.isTooEarly(element)) {
          $(element).valid();
        }
      },
      // Grouping fields makes jQuery Validation display one error for all the fields in the group
      // It doesn't have anything to do with how the fields are validated (together or separately), 
      // it's strictly for visual display of errors
      groups: mc.getGroups(),
      // Place a field's inline error HTML just before the div.mc-field-group closing tag 
      errorPlacement: function(error, element) {
        element.closest('.mc-field-group').append(error);
          },
          // Submit the form via ajax (see: jQuery Form plugin)
      submitHandler: function(form) {
        $(form).ajaxSubmit(mc.ajaxOptions);
      }
    });

    window.mc.ajaxOptions = { 
      url: mc.getAjaxSubmitUrl(), 
      type: 'GET', 
      dataType: 'json', 
      contentType: "application/json; charset=utf-8",
      success: mc.mce_success_cb
    };

    // Custom validation methods for fields with certain css classes
    $.validator.addClassRules("birthday", { digits: true, mc_birthday: ".datefield" });
    $.validator.addClassRules("datepart", { digits: true, mc_date: ".datefield" });
    $.validator.addClassRules("phonepart", { digits: true, mc_phone: ".phonefield" });

    // Evil Popup
    $('#mc_embed_signup a.mc_embed_close').click(function(){ 
      mc.closePopup(); 
    });
    // $(document).keydown(function(e){
    //       keycode = (e == null) ? event.keyCode : e.which;
    //       if (keycode == 27) mc.closePopup();
    //   });
    
  }(jQuery));
}