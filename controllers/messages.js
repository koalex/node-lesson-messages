const Message = require('../models/message');
const Socket  = require('../../../lib/socket');

exports.getAll = async ctx => {
    ctx.type = 'json';
    if (ctx.query.withUser) {
        ctx.body = await Message.find().populate('user_id');
    } else {
        ctx.body = await Message.find().lean().exec();
    }
};

exports.getOne = async ctx => {
    ctx.type = 'json';
    ctx.body = await Message.findOne({_id: String(ctx.params.messageId)}).lean().exec();
};

exports.create = async ctx => {
    const message = new Message({
        message: ctx.request.body.message,
        user_id: ctx.state.user._id
    });

    await message.save();

    Socket.io.emit('NEW_MESSAGE', message);

    ctx.redirect('/');
};

exports.update = async ctx => {
    const message = await Message.findOne({_id: String(ctx.params.messageId)});

    if (!message) return ctx.throw(404);

    message.message = ctx.request.body;

    await message.save();

    ctx.status = 200;
};

exports.delete = async ctx => {
    await Message.findByIdAndRemove(String(ctx.params.messageId));

    ctx.status = 200;
};
