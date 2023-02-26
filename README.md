#instalationation guide
 
1. npm install

2. Download the node_assignment.sql file from root of project directory and install in local server.


#Route List

1.http://localhost:2004/api/userRegistration
method -- POST

Request Body 
{
    "name":"mainak4",
    "contact_no":"8777073185",
    "gender":"male",
    "address":"kolkata-157",
    "password":"mainak1992"
}

2.http://localhost:2004/api/login
method -- POST

Request Body
{
    "name":"mainak4",
    "password":"mainak1993"
}

3.http://localhost:2004/api/forgotPassword
method -- POST

Request Body
{
    "name":"mainak4",
    "contact_no": "8777073185",
    "newPassword":"mainak1993"
}

4.http://localhost:2004/api/fileUpload   # (Procted with JWT Auth tokem)
method -- POST

header ; {
    Authorization : Bearer  token
}
Request Body
{
    file : img file (less than 1 mb)
}

5.http://localhost:2004/api/cleanObject

method -- GET
