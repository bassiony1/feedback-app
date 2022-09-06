Commentinput = document.querySelector('.comment-input');
errormessage = document.querySelector('.error-msg');
let rate = 10 ;
let inputvalue = '';
edit = false ;
radiobtns = [...document.querySelectorAll('.radio-check')];
commentBtn =document.querySelector('.comment-btn');
tempcommment = document.querySelector('template');
review_num = document.querySelector('.review-num');
comments = [...document.querySelectorAll('.comment-card')];
avgrate = document.querySelector('.review-rate');
deleteBtns = document.querySelectorAll('.comment-delete');
editBtns = document.querySelectorAll('.comment-edit');
let editingcomment = null;
const getReviews = () => { review_num.innerText = `${comments.length} Reviews` ;}

const deleteing = (e)=>{
    let btn = e.target ;
    document.querySelector('.main-comment').removeChild(btn.closest('.comment-card'));
    comments = [...document.querySelectorAll('.comment-card')];
    getReviews();
    avg();
}
const avg = () => { 
    avgrate.innerText = `Average Rating:  ${comments.length==0 ? 0 :(comments.map((c) => {
    return +c.querySelector('.comment-rate').innerText}).reduce((r , acc)=>{return acc += r;}, 0)/comments.length).toFixed(1)}`
}
const commentAdd = (e)=>{
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
    comment_card.querySelector('.comment-delete').addEventListener('click', deleteing);
    comment_card.querySelector('.comment-edit').addEventListener('click', editing);
    comments = [...document.querySelectorAll('.comment-card')]
    avg();
    commentBtn.disabled = true;
}
const commentEdit = (e , comment)=>{
    e.preventDefault();
    if(inputvalue.length > 2 )
    {
    editingcomment.querySelector('.comment-content').innerText = inputvalue;
    editingcomment.querySelector('.comment-rate').innerText = rate;
    getReviews();
    avg();
    edit = false ;
    commentBtn.innerText = 'Add';
    inputvalue = '';
    Commentinput.value = '';
    editingcomment = null;
    radiobtns[9].checked = true;
    commentBtn.disabled = true;

    }else {
        errormessage.classList.remove('d-none')
        errormessage.classList.add('d-block')
    }
}
const editing = (e)=>{
    let btn = e.target ;
    editingcomment = btn.closest('.comment-card');
    content = editingcomment.querySelector('.comment-content');
    rate =  +editingcomment.querySelector('.comment-rate').innerText;
    commentBtn.innerText = 'Edit';
    commentBtn.disabled = false;
    Commentinput.value = content.innerText;
    inputvalue = content.innerText;
    radiobtns[rate-1].checked = true ;
    edit = true ;
    Commentinput.focus();
}
avg();
getReviews();
Commentinput.addEventListener('input' , (e)=>{
    inlen = e.target.value.length;
    inputvalue = e.target.value;
    if(inlen < 2  && edit === false){
        errormessage.classList.remove('d-none')
        errormessage.classList.add('d-block')
        commentBtn.disabled = true ;
    }else if (inlen > 2 || edit=== true  ){
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

commentBtn.addEventListener('click' , (e) => {
    if (edit === false)    
    commentAdd(e);
    else if (edit === true && editingcomment !== null)
    commentEdit(e , editingcomment);

} );

deleteBtns.forEach((dB)=>{

    dB.addEventListener('click' ,  deleteing);

})


editBtns.forEach((EB)=>{
    EB.addEventListener('click',editing);
})