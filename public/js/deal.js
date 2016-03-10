$(document).ready(function() {

    // $('#blue').on("click", function(){
    //   $('#modal').modal('show');
    // });

    var curr_pos = function(pos){
      var lat = pos.coords.latitude,
      long = pos.coords.longitude,
      coords = lat + ' ,' + long;
      $('#google_map').attr('src','https://maps.google.com?q='+
        coords +'&z=60&output=embed');   
      console.log(lat);
      console.log(long);
    };

    $('#get_location').on('click', function(){
      navigator.geolocation.getCurrentPosition(curr_pos);
      return false;
    });


    $("#userLocation").keyup(function(event){
      if(event.keyCode == 13){
        $("#locationBtn").click();
      }
    });


    $(".panel").on("click", ".btn-info", function() {
      $(this).closest('.panel-heading').next(".panel-footer").collapse("toggle");
    });


    $("#locationBtn").click(function (e) {

      $("#dealsRow").empty();
      $("#couponsRow").empty();

      e.preventDefault();

      var userLocation = $("#userLocation").val().trim();

      var sqootDealAPI = "https://api.sqoot.com/v2/deals?api_key=fflt53&location=?";
      sqootDealAPI += userLocation;

      $.getJSON(sqootDealAPI, {
        action: "query.location",
        list: "search",
        format: "json"
      }, 

      function (data) {

        console.log(data);

        $.each(data.deals, function buildDealThumbnail (i, item) {

          var dealId = data.deals[i].deal.id;
          var categoryName = $("<h3>").append(data.deals[i].deal.category_name).append(" Deal");
          var dealTitle = $("<p>").append(data.deals[i].deal.title);
          var merchantName = $("<p>").html("Supplier: ").append(data.deals[i].deal.merchant.name);
          var merchantLocality = $("<p>").html("City: ").append(data.deals[i].deal.merchant.locality);
          var merchantRegion = $("<p>").html("State: ").append(data.deals[i].deal.merchant.region);
          var dealImage =$("<img>").attr("src", data.deals[i].deal.image_url).addClass("img-thumbnail");

          var dealExpire = $("<p>").html("Expiration: ").append(data.deals[i].deal.expires_at);
          var dealPrice = $("<p>").html("Price: $").append(data.deals[i].deal.price);
          var dealDescription = $("<p>").html("Description: ").append(data.deals[i].deal.short_title);
          var dealUrl = $("<a>").attr("href", data.deals[i].deal.untracked_url).html("Check it out at " + data.deals[i].deal.provider_name);

          var colDiv = $("<div>").attr("id", "colDealDiv").addClass("row col-md-8 col-md-offset-2 colDiv");
          var dealPanel = $("<div>").addClass("panel panel-default");
          var dealPanelHead = $("<div>").addClass("panel-heading");
          var dealPanelBody = $("<div>").addClass("panel-body");
          var dealButtonInfo = $("<button>").addClass("btn btn-info btn-block siteBtn");

          var dealPanelFooter = $("<div>").addClass("panel-footer");
          var thumbnailDealDiv = $("<div>").attr("id", "thumbnailDealDiv").addClass("thumbnail text-center");
          var captionDiv = $("<div>").attr("id", "captionDealDiv").addClass("caption");


          $("#dealsRow").append(colDiv
            .append (dealPanel
              .append(dealPanelHead
                .append(categoryName)
                )
              .append(dealPanelBody
                .append(thumbnailDealDiv
                  .append(captionDiv

                    .append(dealTitle)
                    .append(merchantName)
                    .append(merchantRegion)
                    .append(merchantLocality)
                    .append(dealImage)

                    ).append(dealButtonInfo
                      .append(dealUrl)
                      )
                  )
                )
              .append(dealPanelFooter
                .append(dealDescription)
                .append(dealPrice)
                .append(dealExpire)
                
                )
              )
            );

        });
    });   

    var userLocation = $("#userLocation").val().trim();

    var sqootCouponAPI = "https://api.sqoot.com/v2/coupons?api_key=fflt53&location=?";
    sqootCouponAPI += userLocation;


    $.getJSON(sqootCouponAPI, {
      action: "query.location",
      list: "search",
      format: "json"
    }, 

    function (data) {
      console.log(data);

      $.each(data.coupons, function buildCouponThumbnail (i, item) {

        var couponId = data.coupons[i].coupon.id;
        var categoryName = $("<h3>").append(data.coupons[i].coupon.category_name).append(" Coupon");
        var couponTitle = $("<p>").append(data.coupons[i].coupon.title);
        var merchantName = $("<p>").html("Supplier: ").append(data.coupons[i].coupon.merchants[0].merchant.name);
        var merchantLocality = $("<p>").html("City: ").append(data.coupons[i].coupon.merchants[0].merchant.locality);
        var merchantRegion = $("<p>").html("State: ").append(data.coupons[i].coupon.merchants[0].merchant.region);
        var couponImage = $("<img>").attr("src", data.coupons[i].coupon.image_url).addClass("img-thumbnail");

        var couponExpire = $("<p>").html("Expiration: ").append(data.coupons[i].coupon.expires_at);
        var couponPrice = $("<p>").append(data.coupons[i].coupon.title);
        var couponDescription = $("<p>").html("Description: ").append(data.coupons[i].coupon.description);
        var couponUrl = $("<a>").attr("href", data.coupons[i].coupon.untracked_url).html("check it out at " + data.coupons[i].coupon.provider_name);

        var colDiv = $("<div>").attr("id", "colCouponDiv").addClass("row col-md-8 col-md-offset-2 colDiv");
        var thumbnailCouponDiv = $("<div>").attr("id", "thumbnailCouponDiv").addClass("thumbnail text-center");
        var captionDiv = $("<div>").attr("id", "captionCouponDiv").addClass("caption");
        var couponPanel = $("<div>").addClass("panel panel-default");
        var couponPanelHead = $("<div>").addClass("panel-heading");
        var couponPanelBody = $("<div>").addClass("panel-body");
        var couponButtonInfo = $("<button>").addClass("btn btn-info btn-block siteBtn");
        var couponPanelFooter = $("<div>").addClass("panel-footer");


        $("#couponsRow").append(colDiv
          .append (couponPanel
            .append(couponPanelHead
              .append(categoryName)
              )
            .append(couponPanelBody
              .append(thumbnailCouponDiv
                .append(captionDiv

                  .append(couponTitle)
                  .append(merchantName)
                  .append(merchantRegion)
                  .append(merchantLocality)
                  .append(couponImage)
                  
                  ).append(couponButtonInfo
                    .append(couponUrl)
                    )
                )
              )
            .append(couponPanelFooter
              .append(couponDescription)
              .append(couponPrice)
              .append(couponExpire)
              
              )
            )
          );
      }); 

    }); 

 }); //end button click

}); //ends document ready