import express from 'express';
import oracledb, { Connection } from 'oracledb';

async function init() {
	const app = express();
	let conn: Connection | null = null;

	conn = await oracledb
		.getConnection({
			user: process.env.ORACLE_USER,
			password: process.env.ORACLE_PASSWORD,
			connectString: 'localhost/XE'
		})
		.catch((e) => {
			console.error(e);
			return null;
		});

	await conn!.execute('CREATE TABLE TEST (test NUMBER(3))');
	await conn!.execute('INSERT INTO TEST VALUES (1)');
	await conn!.commit();

	const resDB = await conn!.execute('SELECT * FROM test');
	app.get('/', (_req, res) => {
		res.send(JSON.stringify(resDB));
	});

	app.listen(process.env.PORT);

	console.log('Server started');
}

init();
