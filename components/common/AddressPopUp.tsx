import '../../css/common/AddressPopUp.css';
import DaumPostcode from 'react-daum-postcode';
import {useState} from 'react';

function AddressPopUp(props:any){
	const [modalState,setModalState]=useState(false);

	const showPopUp=props.showPopUp
	console.log(showPopUp)

	const postCodeStyle = {
		width: '500px',
		height: '450px',
		display: props.showPopUp ? 'block' : 'none',
	  }; // 스타일 정의 code

	  const onCompletePost = (data:any) => {
		console.log(data)
		props.setAddress(data.address)
		props.setShowPopUp(false)
	  }; // onCompletePost 함수

	  const closePopUp=()=>{
		props.setShowPopUp(false)
	  }
	return(
		<div id='address-popup'>
			<div id='close-btn-wrap'>
				<button onClick={closePopUp}>닫기</button>
			</div>
			<DaumPostcode
				style={postCodeStyle}
				autoClose
				onComplete={onCompletePost}
			></DaumPostcode> 
		</div>
	)
}

export default AddressPopUp;