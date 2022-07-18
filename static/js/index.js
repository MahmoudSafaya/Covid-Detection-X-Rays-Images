
const loader = document.querySelector('.loader');
const result = document.querySelector('#result');

const image_section = document.querySelector('.img-section');
const image_preview = document.querySelector('#imagePreview');

const predictBtn = document.querySelector('#btn-predict');


image_section.classList.toggle('hide-show');
loader.classList.toggle('hide-show');
result.classList.toggle('hide-show');
predictBtn.classList.toggle('hide-show');


// Upload Preview
const readURL = (input) => {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            image_preview.style.backgroundImage = `url(${e.target.result})`;
            /* Next for just the animation.... I Think */
            // image_preview.classList.toggle('hide-show');
            // image_preview.classList.toggle('hide-show'); // fadeIn 650
        }
        // reader.addEventListener('load', (e) => {
        //     image_preview.style.backgroundImage = `url(${e.target.result})`;
        //     image_preview.classList.toggle('hide-show');
        //     image_preview.classList.toggle('hide-show'); // fadeIn 650
        // });
        reader.readAsDataURL(input.files[0]);
    }
}


document.querySelector("#imageUpload").addEventListener('change', (e) => {
    image_section.classList.toggle('hide-show');
    predictBtn.classList.toggle('hide-show');
    result.innerHTML = '';
    result.classList.toggle('hide-show');
    readURL(e.target);
});

// Predict
// in form html >> name="fileinfo"
const form = document.forms.namedItem("fileinfo");

predictBtn.addEventListener('click', () => {
    let form_data = new FormData(form);

    // Show loading animation
    // predictBtn.classList.toggle('hide-show');
    loader.classList.toggle('hide-show');

    // Make prediction by calling api /predict
    $.ajax({
        type: 'POST',
        url: '/predict',
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            console.log('Success!');
            loader.classList.toggle('hide-show');
            result.classList.toggle('hide-show');
            result.innerHTML = `Result: ${data}`;
        },
    });
})