document.addEventListener('DOMContentLoaded', function() {

document.querySelectorAll(".tus_cs_collection_image").forEach(function(elem , index) {

  elem.addEventListener('click', function() {
    this.closest(".tus_cs_collection").querySelector(".z_product_flow").style.display = "block";
  })
});

  document.querySelectorAll(".z_size_header").forEach(function(elem , index) {
    elem.addEventListener('click' , function() {
    const innerHeight = this.nextElementSibling.scrollHeight;
      if(this.classList.contains('active')) {
        
      this.closest(".prod_opt_main").querySelector(".z_hight").style.maxHeight = `0`;
        this.classList.remove("active")
      console.log(innerHeight , "innerHeight")
      
      }
      else {
        this.closest(".prod_opt_main").querySelector(".z_hight").style.maxHeight = `${innerHeight}px`;
      console.log(innerHeight , "innerHeight")
        this.classList.add('active')
      }
      
    })
  }) 

  
document.querySelectorAll('.z_shoe_swatches .lab_swat').forEach(function(element) {
    element.addEventListener('change', function() {

      if( this.closest(".z_hight")) {
        console.log("height" )
        let value = this.value;
        this.closest(".prod_opt_main").querySelector(".z_size_header .z_sizes_txt").style.display = "none";
        this.closest(".prod_opt_main").querySelector(".z_size_header .z_selected_text").innerHTML = `${value}`;
      }
      
        let myvalue = '';
        let final_val = '';
  
let parentElement = this.closest('.z_shoe_swatches');


let checkedCheckboxes = parentElement.querySelectorAll(".lab_swat:checked");


checkedCheckboxes.forEach(function(checkbox) {
 
    let parentLabel = checkbox.closest("label.v-variant-btn.siz_lab");
    
    
    let labSizeText = parentLabel.querySelector(".lab_size").textContent.trim();
    
   
    myvalue += labSizeText + " / ";
    
    // Log the current value
    console.log(myvalue, "value", "--");
});

        
        
        final_val = myvalue.slice(0, -2).trim();
        console.log("change" , final_val)
       
        document.querySelectorAll('.z_shoe_swatches .z_combination_product option').forEach(function(option) {
            let option_val = option.textContent.trim();
            if (option_val === final_val) {
                let data_id = option.getAttribute('data-id');
                let var_qty = option.getAttribute('data-qty');
                
                
                option.closest('.z_child_shoe').querySelector('.z_combination_product').value = data_id;
                option.closest('.z_child_shoe').querySelector('.z_combination_product').dispatchEvent(new Event('change'));
                option.closest('.z_child_shoe').querySelector('.cart_bag').setAttribute('id', data_id);
                option.closest('.z_child_shoe').querySelector('.cart_bag').setAttribute('var_qty', var_qty);
                
                
                if (var_qty <= 0) {
                    document.querySelector('.adding_bag').style.display = 'none';
                    document.querySelector('.ab-sold').style.display = 'block';
                    document.querySelector('.cart_bag').style.pointerEvents = 'none';
                } else {
                    document.querySelector('.adding_bag').style.display = 'block';
                    document.querySelector('.ab-sold').style.display = 'none';
                    document.querySelector('.cart_bag').style.pointerEvents = 'all';
                }
            }
        });
    });
});

document.querySelectorAll('.cart_bag').forEach(function(element) {
    element.addEventListener('click', function() {
        let variant_id = parseInt(this.closest('.z_shoe_swatches').querySelector('.z_combination_product option:checked').getAttribute('data-id'));
        let quantity = 1;

        var form_data = {
            'id': variant_id,
            'quantity': `${quantity}`
        };

        console.log(variant_id);
        console.log(form_data);
        update(form_data);
    });
});
  
function update(data) {
$.ajax({
url: '/cart/add.js',
method: 'POST',
data: data,
dataType: 'json',
success: function(data) {
alert("successfull")
},
error: function(xhr, status, error) {
// Handling any errors that occurred during the request
alert("Unsuccessfull")
}
});
}
  
});

