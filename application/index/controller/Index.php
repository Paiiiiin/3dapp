<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use app\common\model\Models;

class Index extends Frontend
{

    protected $noNeedLogin = '*';
    protected $noNeedRight = '*';
    protected $layout = '';

    public function index()
    {
        return $this->view->fetch();
    }

    public function models()
    {

        $models = new Models();
        $list  = $models->select();
        $this->view->assign('models',$list);
        return $this->view->fetch();
    }

}
