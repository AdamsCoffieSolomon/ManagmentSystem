        function showOverlay() {
            document.getElementById('overlay').style.display = 'flex';
        }

        function closeOverlay() {
            document.getElementById('overlay').style.display = 'none';
        }

        function switchCheckboxes() {
            const checkbox1 = document.getElementById('checkbox1');
            const checkbox2 = document.getElementById('checkbox2');

            // If checkbox1 is checked, uncheck checkbox2, and vice versa
            checkbox2.checked = !checkbox1.checked;
        }

        function rsubmit() {
            window.location = "./paymentmade";
        };

        function smssubmit() {
            window.location = "./sending-sms";
        }