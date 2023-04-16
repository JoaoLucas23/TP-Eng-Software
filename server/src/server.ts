import {app} from './server-config/express-config';

const port = 3000;

app.listen(port,() => console.log(`Server is listening on port ${port}`));