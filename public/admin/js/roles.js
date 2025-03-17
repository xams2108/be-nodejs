// Permissions
const tablePermissions = document.querySelector('[table-permissions]');
if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]");

    if (buttonSubmit) {
        buttonSubmit.addEventListener("click", () => {
            let permissions = [];
            const rows = tablePermissions.querySelectorAll("[data-name]");

            rows.forEach(row => {
                const name = row.getAttribute("data-name");
                const inputs = row.querySelectorAll("input");

                if (name === "id") {
                    inputs.forEach(input => {
                        const id = input.value;
                        permissions.push({
                            id: id,
                            permissions: []
                        });
                    });
                } else {
                    inputs.forEach((input, index) => {
                        if (input.checked) {
                            permissions[index].permissions.push(name);
                        }
                    });
                }
            });

            console.log(permissions);
            if (permissions.length > 0) {
                const formChangePermissions = document.querySelector("#form-change-permissions");
                if (formChangePermissions) {
                    const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");
                    if (inputPermissions) {
                        inputPermissions.value = JSON.stringify(permissions);
                        formChangePermissions.submit();
                    } else {
                        console.error("Input permissions not found");
                    }
                } else {
                    console.error("Form change permissions not found");
                }
            } else {
                console.error("No permissions to submit");
            }
        });
    } else {
        console.error("Submit button not found");
    }
} else {
    console.error("Table permissions not found");
}

//Data default
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
    console.log(dataRecords)
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    console.log(records)
    const tablePermissions = document.querySelector('[table-permissions]');

    records.forEach((record, index) => {
        const permissions = record.permissions;

        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            if (row) {
                const input = row.querySelectorAll('input')[index];
                input.checked = true
            }
        });
    });
}