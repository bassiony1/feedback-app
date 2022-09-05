Commentinput = document.querySelector('.comment-input');
errormessage = document.querySelector('.error-msg');
let rate = 10 ;
let inputvalue = '';
radiobtns = [...document.querySelectorAll('.radio-check')];
commentBtn =document.querySelector('.comment-btn');
tempcommment = document.querySelector('template');
review_num = document.querySelector('.review-num');
comments = [...document.querySelectorAll('.comment-card')];
avgrate = document.querySelector('.review-rate');

review_num.innerText = `${comments.length} Reviews`

const avg = () => { 
    avgrate.innerText = `Average Rating: ${(comments.map((c) => {
    return +c.querySelector('.comment-rate').innerText}).reduce((r , acc)=>{return acc += r;}, 0)/comments.length).toFixed(1)}`}

avg();
Commentinput.addEventListener('input' , (e)=>{
    inlen = e.target.value.length;
    inputvalue = e.target.value;
    if(inlen < 2  ){
        errormessage.classList.remove('d-none')
        errormessage.classList.add('d-block')
        commentBtn.disabled = true ;
    }else if (inlen > 2 ){
        errormessage.classList.remove('d-block')
        errormessage.classList.add('d-none')
        commentBtn.disabled = false ;
    }
})

radiobtns.forEach((rb)=>{
    
    rb.addEventListener('change' , (e)=>{
        rate = +e.target.value;
    
    })
})

commentBtn.addEventListener('click' , (e)=>{
    e.preventDefault();
    let comment_card = document.createElement('div');
    comment_card.classList.add('comment-card',  'bg-dark' ,'bg-opacity-75');
    comment_card.innerHTML =
        `<div class="comment-rate">${rate}</div>
        <div class="comment-control flex-row ">
            <i class="comment-edit fa fa-edit"></i>
            <i class=" comment-delete fa fa-delete-left"></i>
        </div>
        <div class="comment-content">${inputvalue}</div>
        `;

    document.querySelector('.main-comment').prepend(comment_card);
    inputvalue = '';
    Commentinput.value = '';
    comments = [...document.querySelectorAll('.comment-card')]
    review_num.innerText = `${comments.length} Reviews`
    avg();
    commentBtn.disabled = true;
})

