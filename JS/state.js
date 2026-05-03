document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DOM Elements ---
    const viewInitial = document.getElementById('view-initial');
    const viewEmail = document.getElementById('view-email');
    const viewOtp = document.getElementById('view-otp');
    
    const btnShowEmailForm = document.getElementById('btn-show-email-form');
    const emailForm = document.getElementById('email-login-form');
    const otpForm = document.getElementById('otp-form');
    
    const displayUserEmail = document.getElementById('display-user-email');
    const otpInputs = document.querySelectorAll('.otp-input');

    // --- 2. Transition: View 1 to View 2 ---
    if (btnShowEmailForm) {
        btnShowEmailForm.addEventListener('click', (e) => {
            e.preventDefault();
            viewInitial.style.display = 'none';
            viewEmail.style.display = 'block';
            document.getElementById('user-email').focus();
        });
    }

    // --- 3. Transition: View 2 to View 3 (Dynamic Email Injection) ---
    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('user-email').value;
            const password = document.getElementById('user-password').value;

            if (!email || !password) return; // Prevent empty submission

            // Inject the email dynamically into the OTP view
            displayUserEmail.textContent = email;

            // Swap views
            viewEmail.style.display = 'none';
            viewOtp.style.display = 'block';

            // Auto-focus the first OTP input
            if (otpInputs.length > 0) otpInputs[0].focus();
        });
    }

    // --- 4. OTP Auto-Advance UX Logic ---
    otpInputs.forEach((input, index) => {
        // Handle typing: Move to next box
        input.addEventListener('input', (e) => {
            // Ensure only numbers are entered
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            
            if (e.target.value !== '' && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        // Handle Backspace: Move to previous box
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
        
        // Handle pasting a 6-digit code all at once
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
            
            for (let i = 0; i < pastedData.length; i++) {
                if (otpInputs[i]) {
                    otpInputs[i].value = pastedData[i];
                    if (i < 5) otpInputs[i + 1].focus();
                }
            }
        });
    });

    // --- 5. Final Verification ---
    if (otpForm) {
        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Gather the 6 digits
            let code = '';
            otpInputs.forEach(input => code += input.value);
            
            if (code.length === 6) {
                console.log("Success! Authenticating with code:", code);
                alert("Assignment Complete. Code: " + code);
            } else {
                alert("Please enter all 6 digits.");
            }
        });
    }
   if (btnShowEmailForm) {
        btnShowEmailForm.addEventListener('click', (e) => {
            e.preventDefault();
            viewInitial.style.display = 'none';
            viewEmail.style.display = 'block';
            
            // Tell the CSS we are in fullscreen mobile mode
            document.body.classList.add('mobile-fullscreen-active'); 
            
            document.getElementById('user-email').focus();
        });
    }
});