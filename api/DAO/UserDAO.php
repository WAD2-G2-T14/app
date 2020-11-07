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
            $name = $row['fullname'];
            $phone = $row['phone_number'];
            $birthday = $row['birthday'];

            return [
                'name' => $name,
                'phone' => $phone,
                'birthday' => $birthday
            ];
        }
    }
}
?>