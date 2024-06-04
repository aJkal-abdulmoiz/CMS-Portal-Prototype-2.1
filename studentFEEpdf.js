    function calculateTotal() {
      var tuitionFee = parseInt(document.getElementById('tuitionFee').value) || 0;
      var libraryFee = parseInt(document.getElementById('libraryFee').value) || 0;
      var labFee = parseInt(document.getElementById('labFee').value) || 0;
      var fines = parseInt(document.getElementById('fines').value) || 0;
      
      var subtotal = tuitionFee + libraryFee + labFee + fines;
      var total = subtotal + 15000;
      
      document.getElementById('totalAmount').textContent = total;
    }

    function awardScholarship() {
      var currentTotal = parseInt(document.getElementById('totalAmount').textContent);
      var scholarshipTotal = currentTotal * 0.95;
      var finalTotal = currentTotal - scholarshipTotal;
      
      document.getElementById('totalAmount').textContent = finalTotal;
    }

    function generateFeeBill() {
      var rollNo = document.getElementById('rollNo').value;
      var studentName = document.getElementById('studentName').value;
      var tuitionFee = document.getElementById('tuitionFee').value;
      var libraryFee = document.getElementById('libraryFee').value;
      var labFee = document.getElementById('labFee').value;
      var fines = document.getElementById('fines').value;
      var totalAmount = document.getElementById('totalAmount').textContent;

      var dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);

      var challan = {
        rollNo: rollNo,
        studentName: studentName,
        tuitionFee: tuitionFee,
        libraryFee: libraryFee,
        labFee: labFee,
        fines: fines,
        totalAmount: totalAmount,
        dueDate: dueDate.toDateString()
      };

      var challans = JSON.parse(localStorage.getItem('challans')) || [];
      challans.push(challan);
      localStorage.setItem('challans', JSON.stringify(challans));

      var documentDefinition = {
        content: [
          { text: 'Air Software and Business School', style: 'header' },
          { text: 'Fee Bill', style: 'subheader' },
          {
            columns: [
              {
                stack: [
                  { text: 'Student Copy', style: 'columnHeader' },
                  `Roll No: ${rollNo}`,
                  `Student Name: ${studentName}`,
                  `Tuition Fee: ${tuitionFee}`,
                  `Library Fee: ${libraryFee}`,
                  `Lab Fee: ${labFee}`,
                  `Fines: ${fines}`,
                  `Total Amount: ${totalAmount}`,
                  `Due Date: ${dueDate.toDateString()}`
                ]
              },
              {
                stack: [
                  { text: 'Academic Staff Copy', style: 'columnHeader' },
                  `Roll No: ${rollNo}`,
                  `Student Name: ${studentName}`,
                  `Tuition Fee: ${tuitionFee}`,
                  `Library Fee: ${libraryFee}`,
                  `Lab Fee: ${labFee}`,
                  `Fines: ${fines}`,
                  `Total Amount: ${totalAmount}`,
                  `Due Date: ${dueDate.toDateString()}`
                ]
              },
              {
                stack: [
                  { text: 'Bank Copy', style: 'columnHeader' },
                  `Roll No: ${rollNo}`,
                  `Student Name: ${studentName}`,
                  `Tuition Fee: ${tuitionFee}`,
                  `Library Fee: ${libraryFee}`,
                  `Lab Fee: ${labFee}`,
                  `Fines: ${fines}`,
                  `Total Amount: ${totalAmount}`,
                  `Due Date: ${dueDate.toDateString()}`
                ]
              }
            ]
          }
        ],
        pageOrientation: 'landscape',
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center'
          },
          subheader: {
            fontSize: 14,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },
          columnHeader: {
            bold: true,
            alignment: 'center',
            margin: [0, 10, 0, 0]
          }
        }
      };

      pdfMake.createPdf(documentDefinition).download('FeeBill.pdf');
    }
