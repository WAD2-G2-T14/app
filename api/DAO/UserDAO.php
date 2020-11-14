<?php
require_once '../config/ConnectionManager.php';

class UserDAO {
    public function getPassword($email) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            SELECT user_id, user_password
            FROM users
            WHERE email = :email
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $row = $stmt->fetch();
            $user_id = $row['user_id'];
            $password = $row['user_password'];
        }

        $stmt = null;
        $pdo = null;

        return [
            'user_id' => $user_id,
            'stored_password' => $password
        ];
    }

    public function getUserDetails($user_id) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            SELECT *
            FROM users
            WHERE user_id = :user_id
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $row = $stmt->fetch();
            $email = $row['email'];
            $name = $row['fullname'];
            $phone = $row['phone_number'];

            return [
                'user_id' => $user_id,
                'email' => $email,
                'name' => $name,
                'phone' => $phone,
            ];
        }
    }

    public function validateEmail($email) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = '
            SELECT *
            FROM users
            WHERE email = :email
        ';

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $row = $stmt->fetch();

            if ($row) return FALSE;
            else return TRUE;
        }
    }

    public function signup($userDetails) {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql_1 = "INSERT INTO users VALUES (:user_id, :email, :password, :phone_number, :fullname);";

        $stmt_1 = $pdo->prepare($sql_1);
        $stmt_1->bindParam(':user_id', $userDetails['user_id'], PDO::PARAM_STR);
        $stmt_1->bindParam(':email', $userDetails['email'], PDO::PARAM_STR);
        $stmt_1->bindParam(':password', $userDetails['password'], PDO::PARAM_STR);
        $stmt_1->bindParam(':phone_number', $userDetails['phone_number'], PDO::PARAM_STR);
        $stmt_1->bindParam(':fullname', $userDetails['fullname'], PDO::PARAM_STR);

        $sql_2 = "INSERT INTO user_addresses VALUES (:user_id, :postal_code, :city, :user_address, :country);";
        $stmt_2 = $pdo->prepare($sql_2);
        $stmt_2->bindParam(':user_id', $userDetails['user_id'], PDO::PARAM_STR);
        $stmt_2->bindParam(':postal_code', $userDetails['postal_code'], PDO::PARAM_STR);
        $stmt_2->bindParam(':city', $userDetails['city'], PDO::PARAM_STR);
        $stmt_2->bindParam(':user_address', $userDetails['user_address'], PDO::PARAM_STR);
        $stmt_2->bindParam(':country', $userDetails['country'], PDO::PARAM_STR);

        if ($stmt_1->execute() && $stmt_2->execute()) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
}
?>